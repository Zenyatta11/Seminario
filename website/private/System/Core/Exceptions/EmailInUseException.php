<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class EmailInUseException extends HttpException {

	public function __construct() {
		parent::__construct("EMAIL_IN_USE", HttpStatusCode::BAD_REQUEST);
	}
}
