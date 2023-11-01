<?php

declare(strict_types=1);

namespace System\Orders;
use InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Models\Address;
use System\Models\Order;
use System\Models\Product;
use System\Models\User;
use System\Products\ProductRepository;
use System\Redistributable\Enviopack\Enviopack;
use System\Redistributable\MercadoPago\MercadoPagoApi;
use System\Users\UserRepository;

class OrdersController {

    public function __construct(
        private OrdersRepository $repository = new OrdersRepository(),
        private UserRepository $userRepository = new UserRepository(),
        private ProductRepository $productRepository = new ProductRepository()
    ) { }

	public function getOrderById(int $id): Order | null {
        return $this->repository->getCartById($id);
    }

    public function confirmStock(Array $data): Array {
        $returnValue = Array();

        foreach($data as $item) {
            $stock = $this->productRepository->getStockById($item['product']['id']);
            if($stock === null) 
                $returnValue[] = Array(
                    "name" => $item['product']['name'],
                    "id" => $item['product']['id'],
                    "stock" => 0,
                    "amount" => $item['amount']
                );
            else if($stock < $item['amount']) {
                $returnValue[] = Array(
                    "name" => $item['product']['name'],
                    "id" => $item['product']['id'],
                    "stock" => $stock,
                    "amount" => $item['amount']
                );
            }
        }

        return $returnValue;
    }

    public function deleteOrder(Order $order): bool {
        return $this->repository->deleteOrder($order);
    }

    public function createOrder(User $owner, Product | null $product = null, int $amount = 1): bool {
        $cartId = $this->repository->createOrder($owner, $product, $amount);
        $this->userRepository->setActiveCart($owner, $cartId);

        return true;
    }

    public function addToCart(Order $order, Product $product, int $amount): false | int {
        return $this->repository->addProductToCart($order, $product, $amount) ? $order->getId() : false;
    }

    public function removeItemFromOrder(Order $order, Product $product): bool {
        return $this->repository->removeProductFromCart($order, $product);
    }

    public function checkInOrder(Order $order, Product $product): Array {
        $productList = $order->getProducts();

        foreach($productList as $item) {
            if($item['product']->getId() == $product->getId())
                return Array(
                    "amount" => $item['amount'],
                    "order_id" => $order->getId()
                );
        }

        return Array(
            "amount" => -1,
            "order_id" => $order->getId()
        );
    }

    public function cotizarEnvio(Order $order, User $user, Address $address): float {
        $envioController = new Enviopack();

        return $envioController->cotizarEnvio($order, $user, $address);
    }

    public function doCheckout(Order $order, User $user, Address $address): string {
        $envioController = new Enviopack();
        $mercadopagoController = new MercadoPagoApi();

        if(count($order->getProducts()) === 0) throw new InvalidArgumentException("EMPTY_CART");

        $montoEnvio = $envioController->cotizarEnvio($order, $user, $address);
        $subtotal = $this->calculateSubtotal($order->getProducts(), $montoEnvio);
        $confirmationId = $this->repository->checkoutOrder($order, $user, $address, $montoEnvio, $subtotal);


        return $mercadopagoController->getRedirect($order, $user, $address, $montoEnvio, $confirmationId);

        //return 'https://seminario.batatas.club/api/order/approved/' . hash("sha256", "ORDER" . $order->getId());
    }

    public function getAllOrdersByUserId(int $userId): Array {
        if(!$this->userRepository->checkExistsById($userId)) throw new NotFoundException("USER_ID");
        return $this->repository->getAllOrdersByUserId($userId);
    }

    private function calculateSubtotal(Array $products, float $shipping): float {
        $total = 0.0;

        foreach($products as $product) {
            $unitPrice = $product['product']->getDiscountPrice() ?? $product['product']->getPrice();
            $total = $total + $unitPrice * $product['amount'];
        }

        return $total + $shipping;
    }
}

?>
