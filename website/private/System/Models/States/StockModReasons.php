<?php

declare(strict_types=1);

namespace System\Models\States;
use System\Core\Exceptions\InvalidArgumentException;

class StockModReasons {
	public const BUY = 1;
	public const RETURN = 2;
	public const CANCEL = 3;
	public const MODIFY = 4;
	public const NEW = 5;
	public const ERROR = 6;

	public static function FROM_STRING(string $state): int {
		switch($state) {
			case "BUY": return StockModReasons::BUY;
			case "RETURN": return StockModReasons::RETURN;
			case "CANCEL": return StockModReasons::CANCEL;
			case "MODIFY": return StockModReasons::MODIFY;
			case "NEW": return StockModReasons::NEW;
			case "ERROR": return StockModReasons::ERROR;
			default: throw new InvalidArgumentException("INVALID_STOCK_MODIFICATION_REASON");
		}
	}

	public static function FROM_VALUE(int $state): string {
		switch($state) {
			case StockModReasons::BUY: return "BUY";
			case StockModReasons::RETURN: return "RETURN";
			case StockModReasons::CANCEL: return "CANCEL";
			case StockModReasons::MODIFY: return "MODIFY";
			case StockModReasons::NEW: return "NEW";
			case StockModReasons::ERROR: return "ERROR";
			default: throw new InvalidArgumentException("INVALID_STOCK_MODIFICATION_REASON");
		}
	}

}
