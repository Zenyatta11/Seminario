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

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($action) {
            case "register": return $this->doRegister(
                    $data['username'] ?? "",
                    $data['name'] ?? "",
                    $data['passwd'] ?? "",
                    $data['email'] ?? ""
                );

            case "login": return $this->doLogin(
                    $data['passwd'] ?? "",
                    $data['email'] ?? "",
                );

            case "logout": return $this->doLogout();

            case "get": return $this->getUserData(
                    $data['fields'] ?? "",
                    $data['id'] ?? ""
                );

            default: throw new NotFoundException();
        }
    }

    private function doRegister(string $username, string $name, string $passwd, string $email): ResponseDTO {
        $error = Array();

        if(empty($username || !ctype_alnum($username))) $error[] = "INVALID_USERNAME";
        if(empty($name || !ctype_alnum($name))) $error[] = "INVALID_NAME";
        if(empty($passwd)) $error[] = "INVALID_PASSWD";

        if(!isset($email)) $error[] = "INVALID_EMAIL";
        else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";

        if(count($error) != 0) throw new RegisterException($error);
        $hashedPasswd = hash("sha256", "seminario" . $passwd['passwd'] . "ecommerce");

        return $this->controller->register($username, $name, $hashedPasswd, $email);
    }

    private function doLogout(): ResponseDTO {
        if(Router::$CURRENT_USER !== null) $this->controller->doLogout();
        else return new ResponseDTO("NOT_LOGGED_IN");
        return new ResponseDTO("LOGGED_OUT");
    }

    private function doLogin(string $passwd, string $email): ResponseDTO {
        $error = Array();
        if(empty($passwd)) $error[] = "INVALID_PASSWD";
        if(empty($email)) $error[] = "INVALID_EMAIL";
        else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";
        if(count($error) != 0) throw new LoginException($error);

        $hashedPasswd = hash("sha256", "seminario" . $passwd . "ecommerce");
        return $this->controller->doLogin($hashedPasswd, $email);
    }

    private function getUserData(string $fields, string $id): ResponseDTO {
        if(empty($id)) {
            if(Router::$CURRENT_USER === null) {
                throw new MissingParametersException(Array('id'));
            } else {
                return $this->controller->getUserData($fields);
            }
        } else {
            if(empty($data['id']) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
            return $this->controller->getUserData($fields, intval($id));
        }
    }
}
