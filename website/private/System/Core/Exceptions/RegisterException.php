<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class RegisterException extends HttpException {

	public function __construct(Array | string $errors) {
		parent::__construct(is_array($errors) ? implode(";", $errors) : $errors, HttpStatusCode::BAD_REQUEST);
	}
}
