<?php

declare(strict_types=1);

namespace System\Orders;
use System\Models\Order;
use System\Models\Product;
use System\Models\User;
use System\Users\UserRepository;

class OrdersController {

    public function __construct(
        private OrdersRepository $repository = new OrdersRepository(),
        private UserRepository $userRepository = new UserRepository()
    ) { }

	public function getOrderById(int $id): Order | null {
        return $this->repository->getCartById($id);
    }

    public function createOrder(User $owner, Product | null $product = null, int $amount = 1) {
        $cartId = $this->repository->createOrder($owner, $product, $amount);
        $this->userRepository->setActiveCart($owner, $cartId);

        return true;
    }

    public function addToCart(Order $order, Product $product, int $amount) {
        return $this->repository->addProductToCart($order, $product, $amount);
    }

    public function removeItemFromOrder(Order $order, Product $product) {
        return $this->repository->removeProductFromCart($order, $product);
    }

}

?>
