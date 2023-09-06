<?php

declare(strict_types=1);

namespace System\Users\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class LoginException extends HttpException {

	public function __construct(array $errors) {
		parent::__construct(implode(";", $errors), HttpStatusCode::BAD_REQUEST);
	}
}
