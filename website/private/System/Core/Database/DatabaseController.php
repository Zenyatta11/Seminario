<?php

declare(strict_types=1);

namespace System\Core\Database;

use System\Core\Prefs;

class DatabaseController {
    public static function CONNECT(): \mysqli | bool {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        return mysqli_connect(
            Prefs\Database::HOST,
            Prefs\Database::USER,
            Prefs\Database::PASSWD,
            Prefs\Database::DATABASE,
            Prefs\Database::PORT,
        );
    }
}
?>
