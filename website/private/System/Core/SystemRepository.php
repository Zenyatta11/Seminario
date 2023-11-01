<?php

declare(strict_types=1);

namespace System\Core;
use System\Core\Database\Repository;
use System\Models\User;

class SystemRepository extends Repository {

	public function getCachedProductTree() {
		return json_decode($this->getValue("product_name_cache"), true);
	}

	public function loadSettings(): void {
		$statement = "SELECT * FROM settings;";
		$result = $this->connection->execute_query($statement);

		$max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $item = $result->fetch_assoc();
            $returnData[$item['variable']] = $item['value'];
        }

		Prefs\Common::$SETTINGS = $returnData;
		Prefs\Common::$SYSTEM_USER = new User(-1, -1, "SYSTEM", "SYSTEM", "SYSTEM", null);
	}

	private function getValue(string $variable): string | null {
		$statement = "SELECT value FROM settings WHERE variable=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($variable));

        return ($result->num_rows == 0 ? null : $result->fetch_assoc()["value"]);
	}

	private function setValue(string $variable, ): string | null {
		$statement = "SELECT value FROM settings WHERE variable=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($variable));

        return ($result->num_rows == 0 ? null : $result->fetch_assoc()["value"]);
	}

}
?>
