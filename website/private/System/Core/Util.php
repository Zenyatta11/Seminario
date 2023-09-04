<?php

declare(strict_types=1);

namespace System\Core;

use System\Core\Prefs;
use System\Models\SearchNode;

class Util {

	public static function RANDOM_UUID(): string {
		$data = random_bytes(16);
		assert(strlen($data) == 16);

		$data[6] = chr(ord($data[6]) & 0x0f | 0x40);
		$data[8] = chr(ord($data[8]) & 0x3f | 0x80);

		return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
	}

	public static function ARRAY_TO_SEARCH_TREE(Array $data): Array {
		$returnTree = new SearchNode(Array(), null);

		foreach($data as $key => $value) {
			if(strlen($key) <= Prefs\Common::SEARCH_STRING_MIN) {
				$returnTree->addChild(Array($key), $value);
				continue;
			}

			$preName = substr($key, 0, Prefs\Common::SEARCH_STRING_MIN);
			$name = str_split(substr($key, Prefs\Common::SEARCH_STRING_MIN));
			array_unshift($name, $preName);

			$returnTree->addChild($name, $value);
		}
		
		return $returnTree;
	}

	public static function VALID_PASSWD(string $passwd): bool {
		if(strlen($passwd) < Prefs\Common::PASSWD_LENGTH_MIN) return false;
		if(strlen($passwd) > Prefs\Common::PASSWD_LENGTH_MAX) return false;
		return true;
	}

	public static function SEND_EMAIL(string $email, string $subject, string $body): bool {
		return false;
	}

}
