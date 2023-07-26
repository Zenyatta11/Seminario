<?php

declare(strict_types=1);

namespace System\Users;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Domain\Util\HttpStatusCode;
use System\Core\Exceptions\AlreadyLoggedInException;
use System\Core\Exceptions\EmailInUseException;
use System\Core\Exceptions\EmailNotInUseException;
use System\Models\Order;
use System\Models\User;
use System\Router;

class UserController {

	public function __construct(
		private UserRepository $repository = new UserRepository()
	) { }

	public function getCartByUserId(int $userId): Order | null {
		return null;
	}

	public function getUserBySessionHash(string $hash): User | null {
		return $this->repository->getUserBySessionHash($hash);
	}

	public function invalidateSessionHash(string $hash): void {
		$this->repository->invalidateSessionHash($hash);
	}

	public function doLogout(): void {
		$this->repository->doLogout();
	}

	public function doLogin(string $passwd, string $email): ResponseDTO {
		if(!$this->repository->checkExistsByEmail($email)) throw new EmailNotInUseException();
        if(Router::$CURRENT_USER !== null) throw new AlreadyLoggedInException();

		$this->repository->newSession($passwd, $email);
		return new ResponseDTO("LOGGED_IN");
	}

	public function register(array $data, string $passwd): ResponseDTO {
		if($this->repository->checkExistsByEmail($data['email'])) throw new EmailInUseException();

        $this->repository->newUser($data, $passwd);
        return new ResponseDTO("REGISTERED");
	}

	public function getUserData($fields, $id = null): ResponseDTO {
		if(isset($fields) && !empty($fields)) $whitelist = explode(";", $fields);
        else $whitelist = null;

		if($id === null) return new ResponseDTO(Router::$CURRENT_USER->jsonify($whitelist));
		
		$user = $this->repository->getUserById($id);

		if($user === null) return new ResponseDTO(null, HttpStatusCode::NOT_FOUND);
		else return new ResponseDTO($user->jsonify($whitelist));
	}
}
