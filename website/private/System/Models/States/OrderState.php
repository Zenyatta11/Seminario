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

	public static function FROM_VALUE(string $state): string {
		switch($state) {
			case "A": return "ENABLED";
			case "B": return "DELETED";
			default: throw new InvalidArgumentException("INVALID_ORDER_STATE");
		}
	}

}
