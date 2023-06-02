<?php

declare(strict_types=1);

namespace System\Auth;
use System\Core\Domain\DTO\ResponseDTO;
use System\Models\User;
use System\Users\UserController;

class AuthController {

    public function __construct(
        private UserController $controller = new UserController()
    ) { }

    public function getAuthenticatedUser(): User | null {
        if(!isset($_COOKIE['session'])) return null;
        $sessionHash = $_COOKIE['session'];

        $user = $this->controller->getUserBySessionHash($sessionHash);
        if($user === null) 
            $this->controller->invalidateSessionHash($sessionHash);
        
        return $user;
    }
}

?>