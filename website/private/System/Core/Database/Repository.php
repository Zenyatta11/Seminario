<?php

declare(strict_types=1);

namespace System\Core\Database;

use \mysqli;

abstract class Repository {

	private mysqli $connection;

	public function __construct() {
		$this->connection = DatabaseController::CONNECT();
	}

    public function __destruct() {
        if ($this->connection)
            $this->connection->close();
    }
}

?>