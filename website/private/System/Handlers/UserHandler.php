<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\LoginException;
use System\Core\Exceptions\MissingParametersException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\RegisterException;
use System\Users\UserController;
use System\Router;

class UserHandler {

    public function __construct(
        private UserController $controller = new UserController()
    ) {

    }

    public function init(string $subsection, string $action, array $data): ResponseDTO {
        switch($action) {
            case "register": return $this->doRegister($data);
            case "login": return $this->doLogin($data);
            case "logout": return $this->doLogout();
            case "get": return $this->getUserData($data);
            default: throw new NotFoundException();
        }
    }

    private function doRegister(array $data): ResponseDTO {
        $error = Array();

        if(!isset($data['username']) || empty($data['username'] || !ctype_alnum($data['username']))) $error[] = "INVALID_USERNAME";
        if(!isset($data['name']) || empty($data['name'] || !ctype_alnum($data['username']))) $error[] = "INVALID_NAME";
        if(!isset($data['passwd']) || empty($data['passwd'])) $error[] = "INVALID_PASSWD";

        if(!isset($data['email'])) $error[] = "INVALID_EMAIL";
        else if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";

        if(count($error) != 0) throw new RegisterException($error);
        $passwd = hash("sha256", "seminario" . $data['passwd'] . "ecommerce");

        return $this->controller->register($data, $passwd);
    }

    private function doLogout(): ResponseDTO {
        if(Router::$CURRENT_USER !== null) $this->controller->doLogout();
        else return new ResponseDTO("NOT_LOGGED_IN");
        return new ResponseDTO("LOGGED_OUT");
    }

    private function doLogin($data): ResponseDTO {
        $error = array();
        if(!isset($data['passwd']) || empty($data['passwd'])) $error[] = "INVALID_PASSWD";
        if(!isset($data['email'])) $error[] = "INVALID_EMAIL";
        else if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";
        if(count($error) != 0) throw new LoginException($error);

        $passwd = hash("sha256", "seminario" . $data['passwd'] . "ecommerce");
        return $this->controller->doLogin($passwd, $data['email']);
    }

    private function getUserData($data): ResponseDTO {
        if(!isset($data['id'])) {
            if(Router::$CURRENT_USER === null) {
                throw new MissingParametersException(Array('id'));
            } else {
                return $this->controller->getUserData($data['fields']);
            }
        } else {
            if(empty($data['id']) || !is_numeric($data['id'])) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
            return $this->controller->getUserData($data['fields'], intval($data['id']));
        }
    }
}
