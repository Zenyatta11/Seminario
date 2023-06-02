<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Users\Exceptions\EmailInUseException;
use System\Users\Exceptions\RegisterException;
use System\Users\UserController;
use System\Users\UserRepository;

class UserHandler {

    public function __construct(
        private UserController $controller = new UserController(),
        private UserRepository $repository = new UserRepository()
    ) {

    }

    public function init(string $subsection, string $action, array $data): ResponseDTO {
        switch($action) {
            case "register": return $this->doRegister($data);
            case "get": return $this->doRegister($data);
            default: return new ResponseDTO();
        }
    }

    private function doRegister(array $data): ResponseDTO {
        $error = Array();

        if(!isset($data['username']) || empty($data['username'])) $error[] = "INVALID_USERNAME";
        if(!isset($data['name']) || empty($data['name'])) $error[] = "INVALID_NAME";
        if(!isset($data['passwd']) || empty($data['passwd'])) $error[] = "INVALID_PASSWD";

        if(!isset($data['email'])) $error[] = "INVALID_EMAIL";
        else if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $error[] = "INVALID_EMAIL";

        if(count($error) != 0) throw new RegisterException($error);

        if($this->repository->checkExistsByEmail($data['email'])) throw new EmailInUseException();

        $passwd = password_hash($data['passwd'], PASSWORD_BCRYPT);
        $this->repository->newUser($data, $passwd);

        return new ResponseDTO();
    }


}