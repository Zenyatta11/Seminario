<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class UnauthorizedException extends HttpException {

	public function __construct() {
		parent::__construct("NOT_ENOUGH_PERMISSIONS", HttpStatusCode::UNAUTHORIZED);
	}
}
