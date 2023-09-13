<?php

declare(strict_types=1);

namespace System\Models\States;
use System\Core\Exceptions\InvalidArgumentException;

class OrderState {
	public const ENABLED = 'A';
	public const DELETED = 'B';

	public static function FROM_STRING(string $state): string {
		switch($state) {
			case "ENABLED": return OrderState::ENABLED;
			case "DELETED": return OrderState::DELETED;
			default: throw new InvalidArgumentException("INVALID_ORDER_STATE");
		}
	}

	public static function FROM_CHAR(string $state): string {
		switch($state) {
			case "A": return OrderState::ENABLED;
			case "B": return OrderState::DELETED;
			default: throw new InvalidArgumentException("INVALID_ORDER_STATE");
		}
	}

}
