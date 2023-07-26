<?php

declare(strict_types=1);

namespace System\Core\Exceptions;

use System\Core\Domain\Util\HttpException;
use System\Core\Domain\Util\HttpStatusCode;

class MissingParametersException extends HttpException {

	public function __construct(Array $message) {
		parent::__construct(implode(";", $message), HttpStatusCode::BAD_REQUEST);
	}
}
