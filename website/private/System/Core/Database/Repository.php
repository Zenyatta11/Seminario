<?php

declare(strict_types=1);

namespace System\Core\Database;

use \mysqli;

abstract class Repository {

	protected mysqli $connection;

	public function __construct() {
		$this->connection = DatabaseController::CONNECT();
	}
}

?>
