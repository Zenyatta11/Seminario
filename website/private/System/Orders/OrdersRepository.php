<?php

declare(strict_types=1);

namespace System\Orders;
use System\Core\Database\Repository;
use System\Core\Exceptions\DatabaseWriteException;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Util;
use System\Models\Order;
use System\Models\Product;
use System\Models\States\OrderState;
use System\Models\User;
use System\Products\ProductRepository;
use System\Users\UserRepository;

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

    public function getCartById(int $id): Order {
        $statement = "SELECT * FROM orders WHERE order_id = ? LIMIT 1;";

        $result = $this->connection->execute_query($statement, Array($id));
        if($result->num_rows === 0) throw new NotFoundException();

        $orderData = $result->fetch_assoc();
        $orderProducts = $this->getOrderProductsById($id);

        $userRepository = new UserRepository();
        $owner = $userRepository->getUserById($orderData['user_id']);

        return new Order($id, $owner, OrderState::FROM_CHAR($orderData["state"]), $orderData['date_opened'], $orderProducts);
    }

    public function getUserByOrderId(int $id): User {
        $statement = "SELECT u.* FROM users u, orders o WHERE u.user_id=o.user_id AND o.order_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        $data = $result->fetch_assoc();
        if(isset($data['passwd'])) unset($data['passwd']);

        return ($result->num_rows == 0 ? null : User::BUILD($data));
    }

    public function getActiveCartByUserId(int $id): Order {
        $statement = "SELECT o.* FROM orders o, users u WHERE order_id = u.active_cart AND u.user_id = ? LIMIT 1;";

        $result = $this->connection->execute_query($statement, Array($id));
        if($result->num_rows === 0) throw new NotFoundException();

        $orderData = $result->fetch_assoc();
        $orderProducts = $this->getOrderProductsById($orderData['order_id']);

        
        $userRepository = new UserRepository();

        return new Order($id, null, OrderState::FROM_CHAR($orderData["state"]), $orderData['date_opened'], $orderProducts);
    }

    private function getOrderProductsById(int $id): Array {
        $statement = "
                SELECT
                p.product_id,
                o.amount
            FROM products p, orders_products o
            WHERE p.state='A' AND o.product_id=p.product_id AND o.order_id=?
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
}

?>
