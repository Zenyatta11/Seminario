<?php

declare(strict_types=1);

namespace System\Users;
use System\Core\Exceptions\AlreadyLoggedInException;
use System\Core\Exceptions\EmailInUseException;
use System\Core\Exceptions\EmailNotInUseException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Util;
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

	public function doLogin(string $passwd, string $email): bool {
		if(!$this->repository->checkExistsByEmail($email)) throw new EmailNotInUseException();
        if(Router::$CURRENT_USER !== null) throw new AlreadyLoggedInException();

		$this->repository->newSession($passwd, $email);
		return true;
	}

	public function register(string $username, string $name, string $passwd, string $email): bool {
		if($this->repository->checkExistsByEmail($email)) throw new EmailInUseException();

        return $this->repository->newUser($username, $name, $passwd, $email);
	}

	public function updateUser(
		string $username, 
		string $document, 
		int | null $permissions, 
		string $name, 
		string $passwdCurrent, 
		string $passwdNew,
		string $passwdConfirm,
		string $email,
		int $id
	): bool {
		// TODO
	}

	public function getUsers(int $page): Array {
		return $this->repository->getUsers($page);
	}

	public function getUserById(int $id): User {
		$user = $this->repository->getUserById($id);

		if($user === null) throw new NotFoundException();
		return $user;
	}

	public function createPasswordResetRequest(string $email): void {
		if(!$this->repository->checkExistsByEmail($email)) return;

		$hash = hash("sha256", "passwdRESET" . time() . "hashsalt");
		$this->repository->createPasswordResetRequest($email, $hash);
		Util::SEND_EMAIL($email, "Reestablecer Contraseña", "");
	}

	public function getUserData(string $fields, int | null $id): Array | null {
		if(!empty($fields)) $whitelist = explode(";", $fields);
        else $whitelist = null;

		if($id === null) return Router::$CURRENT_USER->toArray($whitelist);
		$user = $this->repository->getUserById($id);

		if($user === null) return null;
		return $user->toArray($whitelist);
	}
}
