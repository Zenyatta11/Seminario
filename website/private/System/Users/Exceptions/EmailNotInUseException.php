<?php

declare(strict_types=1);

namespace System\Users\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class EmailNotInUseException extends HttpException {

	public function __construct() {
		parent::__construct("EMAIL_UNREGISTERED", HttpStatusCode::BAD_REQUEST);
	}
}
