<?php

declare(strict_types=1);

namespace System\Users\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class NotLoggedInException extends HttpException {

	public function __construct() {
		parent::__construct("NOT_LOGGED_IN", HttpStatusCode::FORBIDDEN);
	}
}
