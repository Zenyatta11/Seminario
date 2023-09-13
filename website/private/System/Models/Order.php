<?php

declare(strict_types=1);

namespace System\Models;
use System\Core\Util;
use System\Models\States\OrderState;
use System\Orders\OrdersRepository;

class Order {

    public function __construct(
        private int $id,
        private User | null $owner,
        private string $state = OrderState::ENABLED,
        private string $dateOpened = "",
        private Array $products = Array(),
    ) { }

    public function getId(): int {
        return $this->id;
    }

    public function getOwner(): User {
        if($this->owner === null) {
            $ordersRepository = new OrdersRepository();
            $this->owner = $ordersRepository->getUserByOrderId($this->getId());
        }

        return $this->owner;
    }

    public function getState(): string {
        return $this->state;
    }

    public function getDateOpened(): string {
        return $this->dateOpened;
    }

    public function getProducts(): Array {
        return $this->products;
    }

    public function toArray(): Array {
        $productArray = Array();

        foreach($this->products as $product) {
            $productArray[] = Array(
                "product" => $product['product']->toArray(),
                "amount" => $product['amount'],
                "url_name" => Util::URL_NAME($product['product']->getName())
            );
        }

        return Array(
            "id" => $this->getId(),
            "owner" => $this->getOwner()->getId(),
            "state" => $this->getState(),
            "dateOpened" => $this->getDateOpened(),
            "products" => $productArray,
        );
    }

}

?>
