<?php

declare(strict_types=1);

namespace System\Orders;
use System\Models\Order;

class OrdersController {

    public function __construct(
        private OrdersRepository $repository = new OrdersRepository()
    ) { }

	public function getOrderById(int $id): Order | null {
        return null;
    }
}

?>
