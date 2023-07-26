<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class UnauthorizedException extends HttpException {

	public function __construct(string $permission) {
		parent::__construct($permission, HttpStatusCode::UNAUTHORIZED);
	}
}
