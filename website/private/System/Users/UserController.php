<?php

declare(strict_types=1);

namespace System\Users;
use System\Core\Exceptions\AlreadyLoggedInException;
use System\Core\Exceptions\EmailInUseException;
use System\Core\Exceptions\EmailNotInUseException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\UnauthorizedException;
use System\Core\Exceptions\UsernameInUseException;
use System\Core\Prefs\Constants\Permissions;
use System\Miscellaneous\MiscRepository;
use System\Models\Address;
use System\Models\Order;
use System\Models\User;
use System\Orders\OrdersRepository;
use System\Router;

class UserController {

	public function __construct(
		private UserRepository $repository = new UserRepository(),
		private MiscRepository $miscRepository = new MiscRepository(),
		private OrdersRepository $ordersRepository = new OrdersRepository()
	) { }

	public function getActiveCartByUserId(int $userId): Order | null {
		return $this->ordersRepository->getActiveCartByUserId($userId);
	}

	public function getActiveAddressByUserId(int $userId): Address | null {
		return $this->miscRepository->getActiveAddressesByUserId($userId);
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
		if($this->repository->checkExistsByUsername($username)) throw new UsernameInUseException();

        $result = $this->repository->newUser($username, $name, $passwd, $email);

		if($result) return $this->repository->registerLogin($email);
		return false;
	}

	public function updateUser(
		string | null $username, 
		string | null $document, 
		int | null $permissions, 
		string | null $name, 
		string | null $passwdCurrent, 
		string | null $passwdNew,
		string | null $passwdConfirm,
		int | null $activeCartId,
		int | null $activeAddressId,
		string | null $email,
		int | null $id
	): Array {
		if(
			$id !== null && 
			$id != Router::$CURRENT_USER->getId() && 
			!Router::$CURRENT_USER->isAllowedTo(Permissions::USERS_MODIFY)
		) throw new UnauthorizedException("UPDATE_USER");
		
		$success = Array();

		if($id === null) $user = Router::$CURRENT_USER;
		else $user = $this->repository->getUserById($id);
		
		if($activeCartId !== null) {
			if(!$this->ordersRepository->checkExistsById($activeCartId)) throw new NotFoundException("ORDER");
			$success['active_cart_id'] = $this->repository->setActiveCart($user, $activeCartId);
		}

		if($activeAddressId !== null) {
			if(!$this->miscRepository->checkAddressExistsById($activeAddressId)) throw new NotFoundException("ADDRESS");
			$success['active_address_id'] = $this->repository->setActiveAddress($user, $activeAddressId);
		}

		return $success;
	}

	public function getUsers(int $page): Array {
		return $this->repository->getUsers($page);
	}

	public function getUserById(int $id): User {
		$user = $this->repository->getUserById($id);

		if($user === null) throw new NotFoundException();
		return $user;
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
