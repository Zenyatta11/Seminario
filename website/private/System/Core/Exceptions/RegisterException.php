<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class RegisterException extends HttpException {

	public function __construct(Array $errors) {
		parent::__construct(implode(";", $errors), HttpStatusCode::BAD_REQUEST);
	}
}
