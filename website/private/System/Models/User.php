<?php

declare(strict_types=1);

namespace System\Models;
use System\Orders\OrdersController;

class User {

    public function __construct(
        private int $id,
        private int $permissions,
        private string $email,
        private string | null $dni,
        private Order | null $activeCart = null
    ) { }
    
    public static function BUILD(array $data): User {
        return new User(
            $data['user_id'],
            $data['permissions'],
            $data['email'],
            $data['document'] ?? null,
            (isset($data['active_cart']) ? OrdersController::getOrderById($data['active_cart']) : null)
        );
    }
}

?>
