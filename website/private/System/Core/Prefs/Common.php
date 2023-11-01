<?php

declare(strict_types=1);

namespace System\Core\Prefs;

class Common {
	public const SESSION_COOKIE = "ecommerce-session";
	public const PASSWD_LENGTH_MIN = 4;
	public const PASSWD_LENGTH_MAX = 32;

	public const SEARCH_STRING_MIN = 3;
	public static $SETTINGS = Array();
	public static $SYSTEM_USER = Array();
}

?>
