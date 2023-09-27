<?php

declare(strict_types=1);

namespace System\Orders;
use System\Models\Address;
use System\Models\Order;
use System\Models\Product;
use System\Models\User;
use System\Redistributable\Enviopack\Enviopack;
use System\Redistributable\MercadoPago\MercadoPagoApi;
use System\Users\UserRepository;

class OrdersController {

    public function __construct(
        private OrdersRepository $repository = new OrdersRepository(),
        private UserRepository $userRepository = new UserRepository()
    ) { }

	public function getOrderById(int $id): Order | null {
        return $this->repository->getCartById($id);
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

        $montoEnvio = $envioController->cotizarEnvio($order, $user, $address);

        return $mercadopagoController->getRedirect($order, $user, $address, $montoEnvio);
    }
}

?>
