<?php

declare(strict_types=1);

namespace System\Models\States;
use System\Core\Exceptions\InvalidArgumentException;

class OrderState {
	public const PENDING = 'A';
	public const PAID = 'A';
	public const COMPLETED = 'A';
	public const CANCELLED = 'B';

	public static function FROM_STRING(string $state): string {
		switch($state) {
			case "PENDING": return OrderState::PENDING;
			case "PAID": return OrderState::PAID;
			case "COMPLETED": return OrderState::COMPLETED;
			case "CANCELLED": return OrderState::CANCELLED;
			default: throw new InvalidArgumentException("INVALID_ORDER_STATE");
		}
	}

	public static function FROM_VALUE(string $state): string {
		switch($state) {
			case OrderState::PENDING: return "PENDING";
            case OrderState::PAID: return "PAID";
            case OrderState::COMPLETED: return "COMPLETED";
            case OrderState::CANCELLED: return "CANCELLED";
			default: throw new InvalidArgumentException("INVALID_ORDER_STATE");
		}
	}
}
