<?php

declare(strict_types=1);

namespace System\Users\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class AlreadyLoggedInException extends HttpException {

	public function __construct() {
		parent::__construct("ALREADY_LOGGED_IN", HttpStatusCode::BAD_REQUEST);
	}
}
