<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class LoginException extends HttpException {

	public function __construct(Array | string $message) {
		parent::__construct(is_array($message) ? implode(";", $message) : $message, HttpStatusCode::UNAUTHORIZED);
	}
}
