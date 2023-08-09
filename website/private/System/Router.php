<?php

declare(strict_types=1);

namespace System;

use System\Auth\AuthController;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Util;
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

    public function getResponse(string $section, string $subsection, string $action): ResponseDTO {
        switch($section) {
            case "users": return $this->handleUsers($subsection, $action);
            case "products": return $this->handleProducts($subsection, $action);
            case "search": return $this->handleSearch($subsection, $action);
            case "orders": return $this->handleOrders($subsection, $action);
            case "checkout": return $this->handleCheckout($subsection, $action);
            case "context": return $this->getData($subsection, $action, $action);
            default: return $this->handleMiscellaneous($section, $action);
        }
    }

    public function getData(string $section, string $subsection, string $action): ResponseDTO {
        return new ResponseDTO(Array(
                'common' => Array(
                    'page' => Array(
                        'title' => "Page Title",
                        'description' => "Page Description",
                        'author' => 'Page Author'
                    ),
                    'header' => Array(
                        'welcomeText' => "Welcome %user%!",
                    ),
                    'fallbackLocale' => "es_AR"
                )
            )
        );
    }

    public function getLanguage(string $locale): Array {
        return json_decode(file_get_contents("./Sources/Common/Locales/" . $locale . ".json"), true);
    }
    
    private function handleUsers(string $subsection, string $action): ResponseDTO {
        return $this->userHandler->init($subsection, $action, $_POST);
    }

    private function handleProducts(string $subsection, string $action): ResponseDTO {

    }

    private function handleSearch(string $subsection, string $action): ResponseDTO {

    }

    private function handleOrders(string $subsection, string $action): ResponseDTO {

    }

    private function handleCheckout(string $subsection, string $action): ResponseDTO {

    }

    private function handleMiscellaneous(string $subsection, string $action): ResponseDTO {
        return $this->miscHandler->init($subsection, $action, $_POST);
    }

   
}

?>
