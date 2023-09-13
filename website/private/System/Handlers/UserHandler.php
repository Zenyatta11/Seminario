<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Domain\Util\HttpStatusCode;
use System\Core\Exceptions\AuthFailure;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\LoginException;
use System\Core\Exceptions\MissingParametersException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\RegisterException;
use System\Core\Util;
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
                    $data['passwdConfirm'] ?? "",
                    $data['email'] ?? ""
                );

            case "update": return $this->doUpdate(
                    $data['username'] ?? "",
                    $data['document'] ?? "",
                    $data['permissions'] ?? "",
                    $data['name'] ?? "",
                    $data['passwdCurrent'] ?? "",
                    $data['passwdNew'] ?? "",
                    $data['passwdConfirm'] ?? "",
                    $data['email'] ?? "",
                    $data['id'] ?? ""
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

            case "list": return $this->getUsers($data['page'] ?? '');

            default: throw new NotFoundException();
        }
    }

    private function doUpdate(
        string $username, 
        string $document, 
        string $permissions, 
        string $name, 
        string $passwdCurrent, 
        string $passwdNew,
        string $passwdConfirm,
        string $email,
        string $id
    ): ResponseDTO {
        $error = Array();

        if(!empty($username) && !ctype_alnum($username)) $error[] = "INVALID_USERNAME";
        if(!empty($document) && !preg_match("/^(\d{6,8}|\d{2}-\d{6,8}-\d{1})$/", $username)) $error[] = "INVALID_DOCUMENT";
        if(!empty($name) && !ctype_alnum(str_replace(" ", "", $name))) $error[] = "INVALID_NAME";
        if(!empty($name) && !is_numeric($permissions)) $error[] = "INVALID_NAME";
        if(empty($passwdCurrent)) $error[] = "PASSWD_REQUIRED";
        if(!empty($passwdCurrent) && !Util::VALID_PASSWD($passwdCurrent)) $error[] = "INVALID_PASSWD";
        if(!empty($passwdNew) && !Util::VALID_PASSWD($passwdNew)) $error[] = "INVALID_NEW_PASSWD";
        if(!empty($passwdConfirm) && !Util::VALID_PASSWD($passwdConfirm)) $error[] = "INVALID_CONFIRM_PASSWD";
        if(!empty($passwdConfirm) && !empty($passwdNew) && $passwdConfirm != $passwdNew) $error[] = "PASSWORDS_DO_NOT_MATCH";
        if(!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";

        if(count($error) != 0) throw new InvalidArgumentException($error);

        return new ResponseDTO(
            $this->controller->updateUser(
                $username, 
                $document, 
                empty($permissions) ? null : intval($permissions), 
                $name, 
                $passwdCurrent, 
                $passwdNew, 
                $passwdConfirm,
                $email, 
                intval($id)
            )
        );
    }

    private function doRegister(string $username, string $name, string $passwd, string $confirmpasswd, string $email): ResponseDTO {
        $error = Array();

        if(empty($username) || !ctype_alnum($username)) $error[] = "INVALID_USERNAME";
        else if(strlen($username) > 15) $error[] = "USERNAME_TOO_LONG";
        if(empty($name) || !ctype_alnum(str_replace(" ", "", $name))) $error[] = "INVALID_NAME";
        else if(strlen($name) > 63) $error[] = "NAME_TOO_LONG";
        if(empty($passwd)) $error[] = "PASSWD_REQUIRED";
        if(!empty($passwd) && !Util::VALID_PASSWD($passwd)) $error[] = "INVALID_PASSWD";
        if(empty($confirmpasswd)) $error[] = "INVALID_PASSWD_CONFIRM";
        if(!empty($passwd) && $confirmpasswd != $passwd) $error[] = "PASSWD_MISMATCH";

        if(empty($email)) $error[] = "INVALID_EMAIL";
        else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";

        if(count($error) != 0) throw new RegisterException($error);
        $hashedPasswd = hash("sha256", "seminario" . $passwd . "ecommerce");

        if($this->controller->register($username, $name, $hashedPasswd, $email))
            return new ResponseDTO("REGISTERED");
        else throw new RegisterException("ERROR_REGISTERING_USER");
    }

    private function getUsers(string $page): ResponseDTO {
        return new ResponseDTO($this->controller->getUsers(intval($page)));
    }

    private function doLogout(): ResponseDTO {
        if(Router::$CURRENT_USER !== null) $this->controller->doLogout();
        else return new ResponseDTO("NOT_LOGGED_IN");
        return new ResponseDTO("LOGGED_OUT");
    }

    private function doLogin(string $passwd, string $email): ResponseDTO {
        $error = Array();
        if(empty($passwd) || !Util::VALID_PASSWD($passwd)) $error[] = "INVALID_PASSWD";
        if(empty($email)) $error[] = "INVALID_EMAIL";
        else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";
        if(count($error) != 0) throw new LoginException($error);

        $hashedPasswd = hash("sha256", "seminario" . $passwd . "ecommerce");
        if($this->controller->doLogin($hashedPasswd, $email)) 
            return new ResponseDTO("LOGGED_IN");
        else throw new LoginException("UNKNOWN");
    }

    private function getUserData(string $fields, string $id): ResponseDTO {
        if(empty($id)) {
            if(Router::$CURRENT_USER === null) {
                throw new MissingParametersException('ID');
            } else {
                $userData = $this->controller->getUserData($fields, null);

                if($userData === null) return new ResponseDTO(null, HttpStatusCode::NOT_FOUND);
		        return new ResponseDTO($userData);
            }
        } else {
            if(empty($data['id']) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
            $userData = $this->controller->getUserData($fields, intval($id));

            if($userData === null) return new ResponseDTO(null, HttpStatusCode::NOT_FOUND);
		    return new ResponseDTO($userData);
        }
    }
}
