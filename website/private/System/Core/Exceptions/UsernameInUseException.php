<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class UsernameInUseException extends HttpException {

	public function __construct() {
		parent::__construct("USERNAME_IN_USE", HttpStatusCode::BAD_REQUEST);
	}
}
