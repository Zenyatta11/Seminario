<?php

declare(strict_types=1);

namespace System\Users;
use System\Core\Database\Repository;
use System\Core\Util;
use System\Models\User;
use System\Core\Exceptions\AuthFailure;
use System\Core\Exceptions\CookiesDisabledException;
use System\Core\Exceptions\NotLoggedInException;
use System\Core\Prefs;
use System\Router;

class UserRepository extends Repository {

    public function getUserById(int $id): User | null {
        $statement = "SELECT * FROM users WHERE user_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : User::BUILD(
                $this->censor($result->fetch_assoc())
            )
        );
    }

    public function getUserByEmail(string $email): User | null {
        $statement = "SELECT * FROM users WHERE email=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($email));

        return ($result->num_rows == 0 ? null : User::BUILD(
                $this->censor($result->fetch_assoc())
            )
        );
    }

    public function getUserIdByEmail(string $email): int | null {
        $statement = "SELECT user_id FROM users WHERE email=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($email));

        if($result->num_rows === 0) return null;
        $data = $result->fetch_assoc();
        return intval($data['user_id']);
    }

    public function getUserBySessionHash(string $hash): User | null {
        $statement = "SELECT u.* FROM users u, sessions s WHERE s.session_id=? AND s.user_id=u.user_id LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($hash));

        return ($result->num_rows == 0 ? null : User::BUILD(
                $this->censor($result->fetch_assoc())
            )
        );
    }

    public function invalidateSessionHash(string $hash): void {
        $statement = "DELETE FROM sessions WHERE session_id=?;";
        $this->connection->execute_query($statement, Array($hash));
    }

    public function checkCredentials(string $passwd, string $email): bool {
        $statement = "SELECT user_id FROM users WHERE passwd=? AND email=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($passwd, $email));
        return $result->num_rows != 0;
    }

    public function doLogout(): void {
        $statement = "DELETE FROM sessions WHERE user_id=?;";
        $this->connection->execute_query($statement, Array(Router::$CURRENT_USER->getId()));
    }

    public function checkExistsByEmail(string $email): bool {
        $statement = "SELECT user_id FROM users WHERE email=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($email));

        return $result->num_rows != 0;
    }

    public function newUser(array $data, string $passwd): bool {

        $statement = "INSERT INTO users(permissions, passwd, email, document, username, name) VALUES(?,?,?,?,?,?)";
        $this->connection->execute_query($statement, Array(
            0,
            $passwd,
            $data['email'],
            $data['document'] ?? null,
            $data['username'],
            $data['name']
        ));

        return true;
    }

    public function newSession(string $passwd, string $email): void {
        $sessionHash = hash("sha256", Util::RANDOM_UUID());

        if(!$this->checkCredentials($passwd, $email)) throw new AuthFailure();
        $userId = $this->getUserIdByEmail($email);

        $statement = "INSERT INTO sessions VALUES(?,?)";
        $this->connection->execute_query($statement, Array(
            $sessionHash,
            $userId
        ));
        
        if(!setcookie(Prefs\Common::SESSION_COOKIE, $sessionHash, 0, "/")) {
            $statement = "DELETE FROM sessions WHERE session_id=?)";
            $this->connection->execute_query($statement, Array(
                $sessionHash
            ));

            throw new CookiesDisabledException();
        }

        return;
    }

    public function updateUser(User $user): bool {

        $statement = "UPDATE users SET permissions=?, email=?, document=? WHERE user_id=?";
        $this->connection->execute_query($statement, Array(
            $user->getPermissions(),
            $user->getEmail(),
            $user->getDNI(),
            $user->getId()
        ));

        return true;
    }

    public function changePassword(string $passwd, string $email, string $newPasswd): bool {
        if(Router::$CURRENT_USER === null) 
            throw new NotLoggedInException();
            
        if($this->checkCredentials($passwd, $email) != Router::$CURRENT_USER->getId())
            throw new AuthFailure();
        
        $statement = "UPDATE users SET passwd=? WHERE email=?";
        $this->connection->execute_query($statement, Array(
            $newPasswd,
            $email
        ));

        return true;
    }

    private function censor(array $data): array {
        if(isset($data['passwd'])) unset($data['passwd']);
        
        return $data;
    }

}

?>
