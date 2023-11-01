<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class NotFoundException extends HttpException {

	public function __construct($msg = "NOT_FOUND") {
		parent::__construct($msg, HttpStatusCode::NOT_FOUND);
	}
}
