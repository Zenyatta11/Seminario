<?php

declare(strict_types=1);

namespace System\Core\Database;

use \mysqli;

abstract class Repository {

	protected mysqli $connection;

	public function __construct() {
		$this->connection = DatabaseController::CONNECT();
        mysqli_autocommit($this->connection, true);
	}

    public function __destruct() {
        if ($this->connection)
            $this->connection->close();
    }
}

?>
