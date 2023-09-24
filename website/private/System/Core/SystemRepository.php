<?php

declare(strict_types=1);

namespace System\Core;
use System\Core\Database\Repository;

class SystemRepository extends Repository {

	public function getCachedProductTree() {
		return $this->getValue("productNameCache");
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
