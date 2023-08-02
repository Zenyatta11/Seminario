<?php

declare(strict_types=1);

namespace System\Models\States;
use System\Core\Exceptions\InvalidArgumentException;

class ProductState {
	public const ENABLED = 'A';
	public const PAUSED = 'B';
	public const DELETED = 'C';

	public static function FROM_STRING(string $state): string {
		switch($state) {
			case "ENABLED": return ProductState::ENABLED;
			case "PAUSED": return ProductState::PAUSED;
			case "DELETED": return ProductState::DELETED;
			default: throw new InvalidArgumentException("INVALID_PRODUCT_STATE");
		}
	}

	public static function FROM_CHAR(string $state): string {
		switch($state) {
			case "A": return ProductState::ENABLED;
			case "B": return ProductState::PAUSED;
			case "C": return ProductState::DELETED;
			default: throw new InvalidArgumentException("INVALID_PRODUCT_STATE");
		}
	}

}
