<?php

declare(strict_types=1);

namespace System\Core\Database;

use \mysqli;

abstract class Repository {

	static protected mysqli $connection;

	public function __construct() {
		Repository::$connection = DatabaseController::CONNECT();
        mysqli_autocommit(Repository::$connection, true);
	}

    public function __destruct() {
        if (Repository::$connection)
            Repository::$connection->close();
    }
}

?>
