<?php

declare(strict_types=1);

namespace System\Core\Database;

use System\Core\Prefs;

class DatabaseController {
    private static $connection = null;
    public static function CONNECT(): \mysqli | bool {
        if(DatabaseController::$connection == null) {
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

            DatabaseController::$connection = mysqli_connect(
                Prefs\Database::HOST,
                Prefs\Database::USER,
                Prefs\Database::PASSWD,
                Prefs\Database::DATABASE,
                Prefs\Database::PORT,
            );

            mysqli_autocommit(DatabaseController::$connection, true);

        }

        return DatabaseController::$connection;
    }
}
?>
