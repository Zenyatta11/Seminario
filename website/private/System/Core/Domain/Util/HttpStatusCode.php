<?php

declare(strict_types=1);

namespace System\Core\Domain\Util;

class HttpStatusCode{
	public const OK = 200;

	public const BAD_REQUEST = 400;
	public const FORBIDDEN = 401;
	public const UNAUTHORIZED = 403;
	public const NOT_FOUND = 404;

	public const SERVER_ERROR = 500;
}
?>
