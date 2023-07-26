<?php

declare(strict_types=1);

namespace System\Auth;
use System\Models\User;
use System\Core\Prefs;
use System\Users\UserController;

class AuthController {

    public function __construct(
        private UserController $controller = new UserController()
    ) { }

    public function getAuthenticatedUser(): User | null {
        if(!isset($_COOKIE[Prefs\Common::SESSION_COOKIE])) return null;
        $sessionHash = $_COOKIE[Prefs\Common::SESSION_COOKIE];

        $user = $this->controller->getUserBySessionHash($sessionHash);
        if($user === null) 
            $this->controller->invalidateSessionHash($sessionHash);
        
        return $user;
    }
}

?>