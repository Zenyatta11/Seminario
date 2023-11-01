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

	public static function FROM_VALUE(string $state): string {
		switch($state) {
			case ProductState::ENABLED: return "ENABLED";
			case ProductState::PAUSED: return "PAUSED";
			case ProductState::DELETED: return "DELETED";
			default: throw new InvalidArgumentException("INVALID_PRODUCT_STATE");
		}
	}

}
