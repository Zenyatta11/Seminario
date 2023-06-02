<?php

declare(strict_types=1);

namespace System;

use System\Core\Database\DatabaseController;
use System\Core\Domain\DTO\ResponseDTO;

class Router {
    public function __construct() {
        $dbController = new DatabaseController();
        $connection = $dbController->getConnection();
        echo("Server info: " . $connection->get_server_info());
        $connection->close();
    }
}

?>