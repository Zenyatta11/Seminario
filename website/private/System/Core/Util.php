<?php

declare(strict_types=1);

namespace System\Core;

use System\Core\Prefs;

class Util {

	public static function RANDOM_UUID(): string {
		$data = random_bytes(16);
		assert(strlen($data) == 16);

		$data[6] = chr(ord($data[6]) & 0x0f | 0x40);
		$data[8] = chr(ord($data[8]) & 0x3f | 0x80);

		return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
	}

	public static function PARSE_PERMISSIONS(int $permissions): string {
		$returnValue = Array();

		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_ADD ? 'PRODUCTS_ADD' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_MODIFY ? 'PRODUCTS_MODIFY' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_PAUSE ? 'PRODUCTS_PAUSE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_DELETE ? 'PRODUCTS_DELETE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_ANSWER ? 'PRODUCTS_ANSWER' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_QUESTION_DELETE ? 'PRODUCTS_QUESTION_DELETE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::PRODUCTS_REVIEW_DELETE ? 'PRODUCTS_REVIEW_DELETE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::USERS_CREATE ? 'USERS_CREATE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::USERS_MODIFY ? 'USERS_MODIFY' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::USERS_DELETE ? 'USERS_DELETE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::ORDERS_MODIFY ? 'ORDERS_MODIFY' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::ORDERS_DELETE ? 'ORDERS_DELETE' : '';
		$returnValue[] = $permissions & Prefs\Constants\Permissions::TOTAL_CONTROL ? 'TOTAL_CONTROL' : '';

		$returnValue = array_filter($returnValue);
		return implode(";", $returnValue);
	}

}
