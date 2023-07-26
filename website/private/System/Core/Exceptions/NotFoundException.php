<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class NotFoundException extends HttpException {

	public function __construct() {
		parent::__construct("NOT_FOUND", HttpStatusCode::NOT_FOUND);
	}
}
