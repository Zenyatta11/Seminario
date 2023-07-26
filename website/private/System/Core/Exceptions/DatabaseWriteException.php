<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class DatabaseWriteException extends HttpException {

	public function __construct() {
		parent::__construct("DATABASE_WRITE_EXCEPTION", HttpStatusCode::SERVER_ERROR);
	}
}
