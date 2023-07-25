<?php

declare(strict_types=1);

namespace System\Core\Prefs\Constants;

class Permissions {
	public const PRODUCTS_ADD = 1;
	public const PRODUCTS_MODIFY = 2;
	public const PRODUCTS_PAUSE = 4;
	public const PRODUCTS_DELETE = 8;
	public const PRODUCTS_ANSWER = 16;
	public const PRODUCTS_QUESTION_DELETE = 32;
	public const PRODUCTS_REVIEW_DELETE = 64;


	public const USERS_CREATE = 128;
	public const USERS_MODIFY = 256;
	public const USERS_DELETE = 512;

	public const ORDERS_MODIFY = 1024;
	public const ORDERS_DELETE = 2048;

	public const TOTAL_CONTROL = 4096;
}

?>
