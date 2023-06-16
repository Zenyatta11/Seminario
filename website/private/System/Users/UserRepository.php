<?php

declare(strict_types=1);

namespace System\Controllers;
use System\Core\Database\Repository;
use System\Models\User;

class UserRepository extends Repository {

    public function getUserById(int $id): User | null {
        $statement = "SELECT * FROM users WHERE id=?";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : User::BUILD(
                $this->censor($result->fetch_assoc())
            )
        );
    }

    private function censor(array $data): array {
        if(isset($data['passwd'])) unset($data['passwd']);
        
        return $data;
    }

}

?>