<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class CookiesDisabledException extends HttpException {

	public function __construct() {
		parent::__construct("COOKIES_DISABLED", HttpStatusCode::BAD_REQUEST);
	}
}
