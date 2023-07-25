<?php

declare(strict_types=1);

namespace System\Users;
use System\Core\Domain\DTO\ResponseDTO;
use System\Models\Order;
use System\Models\User;

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

	public function doLogin(string $passwd, string $email): void {
		$this->repository->newSession($passwd, $email);
	}
}
