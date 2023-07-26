<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Users\UserController;
use System\Users\UserRepository;

class OrdersHandler {

    public function __construct(
        private UserController $controller = new UserController(),
        private UserRepository $repository = new UserRepository()
    ) {

    }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($action) {
            case "register": return $this->doRegister($data);
            case "login": return $this->doLogin($data);
            case "logout": return $this->doLogout();
            case "get": return $this->doGetUserData($data);
            default: return new ResponseDTO();
        }
    }

}
