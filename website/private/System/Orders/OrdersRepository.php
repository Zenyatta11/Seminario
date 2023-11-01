<?php

declare(strict_types=1);

namespace System\Orders;
use System\Core\Database\Repository;
use System\Core\Exceptions\DatabaseWriteException;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Models\Address;
use System\Models\Order;
use System\Models\Product;
use System\Models\States\OrderState;
use System\Models\States\StockModReasons;
use System\Models\User;
use System\Products\ProductRepository;
use System\Users\UserRepository;
use System\Core\Prefs;

class OrdersRepository extends Repository{

	public function createOrder(User $owner, Product | null $product = null, int $amount = 0): int {
        $statement = "INSERT INTO orders(user_id) VALUES(?)";

        if($this->connection->execute_query($statement, Array($owner->getId()))) {
            $cartId = $this->connection->insert_id;

            if($product != null) $this->addProductToCart(new Order($cartId, $owner), $product, $amount);
            return $cartId;
        } else throw new DatabaseWriteException();
    }

    public function addProductToCart(Order $cart, Product $product, int $amount): bool {
        $statement = "
            INSERT INTO orders_products (order_id, product_id, variation_id, amount) 
            VALUES (?,?,?,?) 
            ON DUPLICATE KEY UPDATE amount = VALUES(amount);";

        if($product->getStock() < $amount) throw new InvalidArgumentException("NOT_ENOUGH_STOCK");

        return $this->connection->execute_query($statement, 
            Array(
                $cart->getId(),
                $product->getId(),
                $product->getVariationId(),
                $amount
            )
        );
    }

    public function removeProductFromCart(Order $cart, Product $product): bool {
        $this->connection->begin_transaction();

        try {
            $statement = "DELETE FROM orders_products WHERE order_id=? AND product_id=?";

            $success = $this->connection->execute_query(
                $statement, 
                Array(
                    $cart->getId(),
                    $product->getId()
                )
            );

            $this->connection->commit();

            if(!$success) $this->connection->rollback();
            return $success;
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException($exception->getMessage() . $exception->getTraceAsString());
        }
    }

    public function deleteOrder(Order $order): bool {
        $this->connection->begin_transaction();

        try {
            $statement = "UPDATE orders SET state='" . OrderState::DELETED . "' WHERE order_id=? AND state='" . OrderState::ENABLED . "'";

            $success = $this->connection->execute_query(
                $statement, 
                Array(
                    $order->getId()
                )
            );

            $this->connection->commit();

            if(!$success) $this->connection->rollback();
            return $success;
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException($exception->getMessage());
        }
    }

    public function checkExistsById(int $id): bool {
		$statement = "SELECT order_id FROM orders WHERE order_id=? AND state='" . OrderState::ENABLED . "' LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows != 0);
	}

    public function checkClosedExistsById(int $id): bool {
		$statement = "SELECT order_confirmed_id FROM orders_confirmed WHERE order_confirmed_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows != 0);
	}

    public function getCartById(int $id): Order {
        $statement = "SELECT * FROM orders WHERE order_id = ? LIMIT 1;";

        $result = $this->connection->execute_query($statement, Array($id));
        if($result->num_rows === 0) throw new NotFoundException();

        $orderData = $result->fetch_assoc();
        $orderProducts = $this->getOrderProductsById($id);

        $userRepository = new UserRepository();
        $owner = $userRepository->getUserById($orderData['user_id']);

        return new Order($id, $owner, OrderState::FROM_VALUE($orderData["state"]), $orderData['date_opened'], $orderProducts);
    }

    public function getUserByOrderId(int $id): User {
        $statement = "SELECT u.* FROM users u, orders o WHERE u.user_id=o.user_id AND o.order_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        $data = $result->fetch_assoc();
        if(isset($data['passwd'])) unset($data['passwd']);

        return ($result->num_rows == 0 ? null : User::BUILD($data));
    }

    public function getActiveCartByUserId(int $id): Order | null {
        $statement = "SELECT o.* FROM orders o, users u WHERE o.order_id = u.active_cart AND u.user_id = ? AND o.state='" . OrderState::ENABLED . "' LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));
        if($result->num_rows === 0) return null;

        $orderData = $result->fetch_assoc();
        $orderProducts = $this->getOrderProductsById($orderData['order_id']);

        
        $userRepository = new UserRepository();

        return new Order($orderData['order_id'], null, OrderState::FROM_VALUE($orderData["state"]), $orderData['date_opened'], $orderProducts);
    }

    public function checkoutOrder(Order $order, User $owner, Address $address, float $montoEnvio, float $subtotal): int {
        $products = $order->getProducts();
        $products['shipping'] = $montoEnvio;

        $statement = "INSERT INTO orders_confirmed(user_id, subtotal, products_json) VALUES(?,?,?);";

        if(
            $this->connection->execute_query($statement, 
                Array(
                    $owner->getId(),
                    $subtotal,
                    json_encode($products, JSON_FORCE_OBJECT, 8)
                )
            )
        ) {
            $this->changeOrderStatus($order->getId(), OrderState::DELETED);
            $this->removeProductsFromStock($order->getProducts(), $owner);

            $confirmedId = $this->connection->insert_id;
            return $confirmedId;
        } else throw new DatabaseWriteException();
    }

    public function getAllOrdersByUserId(int $userId): Array {
        $returnData = Array();

        $returnData["open"] = $this->getAllOpenOrdersByUserId($userId);
        $returnData["closed"] = $this->getAllClosedOrdersByUserId($userId);
        
        return $returnData;
    }

    private function getAllOpenOrdersByUserId(int $userId): Array {
        $statement = "
            SELECT 
                o.*, 
                CASE WHEN o.order_id = u.active_cart THEN 1 ELSE 0 END AS active
            FROM 
                orders o
            INNER JOIN
                users u ON u.user_id = o.user_id
            WHERE 
                u.user_id = ? AND
                o.state != 'B';";
        
        $result = $this->connection->execute_query($statement, Array($userId));

        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $order = $result->fetch_assoc();
            $order['products'] = $this->getOrderProductsById($order['order_id']);
            $returnData[] = $order;
        }

        return $returnData;
    }

    private function getAllClosedOrdersByUserId(int $userId): Array {
        $statement = "SELECT * FROM orders_confirmed WHERE user_id=?";
        $result = $this->connection->execute_query($statement, Array($userId));

        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1)
            $returnData[] = $result->fetch_assoc();

        return $returnData;
    }

    private function getOrderProductsById(int $id): Array {
        $statement = "
                SELECT
                p.product_id,
                o.amount
            FROM products p, orders_products o
            WHERE p.state='" . OrderState::ENABLED . "' AND o.product_id=p.product_id AND o.order_id=?
            ORDER BY p.name";

        $result = $this->connection->execute_query($statement, Array($id));

        $max = $result->num_rows;
        $returnData = Array();
        $productRepository = new ProductRepository();

        for($i = 0; $i < $max; $i = $i + 1) {
            $product = $result->fetch_assoc();
            $returnData[] = Array(
                "product" => $productRepository->getProductById($product['product_id']),
                "amount" => $product['amount']
            );
        }
        
        return $returnData;
    }

    private function changeOrderStatus(int $id, string $status): void {
        $statement = "UPDATE orders SET state=? WHERE order_id=?";
        if(!$this->connection->execute_query($statement, Array($status, $id))) throw new DatabaseWriteException();
    }

    private function removeProductsFromStock(array $products, User $owner): void {
        $modifiedProducts = Array();
        $errors = Array();

        foreach($products as $product) {
            try {
                $statement = "UPDATE products SET stock=(stock-?) WHERE product_id=?";
                $commit = $this->connection->execute_query($statement, Array($product['amount'], $product['product']->getId()));

                if($this->connection->affected_rows === 1 && $commit && $this->logStockChanges($owner, $product['product'], $product['amount'], StockModReasons::BUY)) {
                    $modifiedProducts[] = Array(
                        "id" => $product['product']->getId(),
                        "amount" => $product['amount']
                    );
                } else {
                    $errors[] = Array(
                        "message" => "NOT_ENOUGH_STOCK", 
                        "product_id" => $product['product']->getId(), 
                        "amount_requested" => $product['amount']
                    );
                }
            } catch (\Exception $e) {
                $errors = Array(
                    "message" => "DATABASE_WRITE_EXCEPTION", 
                    "product_id" => $product['product']->getId(), 
                    "amount_requested" => $product['amount'],
                    "query" => "UPDATE products SET stock=(stock-" . $product['amount'] . ") WHERE product_id=" . $product['product']->getId()
                );
            }
        }

        if(count($errors) != 0) {
            $this->revertProductRemoval($modifiedProducts);
            throw new InvalidArgumentException($errors);
        }
    }

    private function revertProductRemoval(Array $products): void {
        foreach($products as $product) {
            $statement = "UPDATE products SET stock=(stock+?) WHERE product_id=?";
            $this->connection->execute_query($statement, Array($product['amount'], $product['id']));
            $this->logStockChanges(Prefs\Common::$SYSTEM_USER, $product['product'], $product['amount'], StockModReasons::ERROR);
        }
    }

    private function logStockChanges(User $user, Product $product, int $amount, int $motive): bool {
        $statement = "INSERT INTO stock_log(user_id, product_id, amount, description) VALUES(?,?,?,?);";

        return $this->connection->execute_query($statement, 
            Array(
                $user->getId(),
                $product->getId(),
                $amount * -1,
                StockModReasons::FROM_VALUE($motive)
            )
        );
    }
}

?>
