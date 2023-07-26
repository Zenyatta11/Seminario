<?php

declare(strict_types=1);

namespace System\Models;

class Order {

    private int $id;
    private int $permissions;
    private Order $activeCart;
    private string $email;
    private string $dni;

    public function getId(): int {
        return $this->id;
    }

}

?>
