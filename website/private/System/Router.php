<?php

declare(strict_types=1);

namespace System;

use System\Auth\AuthController;
use System\Core\Domain\DTO\ResponseDTO;
use System\Handlers\MiscellaneousHandler;
use System\Handlers\UserHandler;
use System\Models\User;

class Router {
    public static User | null $CURRENT_USER;

    public function __construct(
        private UserHandler $userHandler = new UserHandler(),
        private MiscellaneousHandler $miscHandler = new MiscellaneousHandler()
    ) {
        $authController = new AuthController();
        Router::$CURRENT_USER = $authController->getAuthenticatedUser();
    }

    public function getResponse(): ResponseDTO {
        switch($_GET['section']) {
            case "users": return $this->handleUsers();
            case "products": return $this->handleProducts();
            case "search": return $this->handleSearch();
            case "orders": return $this->handleOrders();
            case "checkout": return $this->handleCheckout();
            default: return $this->handleMiscellaneous();
        }
    }

    private function handleUsers(): ResponseDTO {
        return $this->userHandler->init($_GET['subsection'], $_GET['action'], $_POST);
    }

    private function handleProducts(): ResponseDTO {

    }

    private function handleSearch(): ResponseDTO {

    }

    private function handleOrders(): ResponseDTO {

    }

    private function handleCheckout(): ResponseDTO {

    }

    private function handleMiscellaneous(): ResponseDTO {
        return $this->miscHandler->init($_GET['section'], $_GET['action'], $_POST);
    }
}

?>
