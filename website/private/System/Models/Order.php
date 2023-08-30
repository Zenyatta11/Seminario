<?php

declare(strict_types=1);

namespace System\Models;

class Order {

    private int $id;
    private User $owner;
    private string $state;
    private string $dateOpened;
    private Array $products;

    public function getId(): int {
        return $this->id;
    }

    public function getOwner(): User {
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

}

?>
