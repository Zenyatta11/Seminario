<?php

declare(strict_types=1);

namespace System\Models;
use System\Core\Exceptions\InvalidArgumentException;
use System\Users\UserController;

class User {

    public function __construct(
        private int $id,
        private int $permissions,
        private string $email,
        private string $username,
        private string $name,
        private string | null $dni,
        private Order | null $activeCart = null,
        private Address | null $activeAddress = null,
        private UserController $userController = new UserController()
    ) { }
    
    public static function BUILD(Array $data): User {
        $errors = Array();
        if(empty($data['user_id'])) $errors[] = "MISSING_USER_ID";
        if(empty($data['email'])) $errors[] = "MISSING_EMAIL";
        if(empty($data['username'])) $errors[] = "MISSING_USERNAME";
        if(empty($data['name'])) $errors[] = "MISSING_Name";

        if(!empty($errors)) throw new InvalidArgumentException($errors);
        
        return new User(
            $data['user_id'],
            $data['permissions'] ?? 0,
            $data['email'],
            $data['username'],
            $data['name'],
            $data['document'] ?? null
        );
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function getUsername(): string {
        return $this->username;
    }

    public function getAddress(): Address | null{
        if($this->activeAddress != null) return $this->activeAddress;

        $this->activeAddress = $this->userController->getActiveAddressByUserId($this->id);
        return $this->activeAddress;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getPermissions(): int {
        return $this->permissions;
    }

    public function getId(): int {
        return $this->id;
    }

    public function isAllowedTo(int $permission): bool {
        return ($permission & $this->permissions) != 0;
    }

    public function getDNI(): string | null {
        return $this->dni;
    }

    public function getCart(): Order | null {
        if($this->activeCart != null) return $this->activeCart;

        $this->activeCart = $this->userController->getActiveCartByUserId($this->id);
        return $this->activeCart;
    }

    public function hasBoughtProduct(): bool {
        return false;
        //todo 
    }

    public function toArray($whitelist = null): Array {
        $returnValue = Array();

        if($whitelist === null || in_array('id', $whitelist)) $returnValue['id'] = $this->id;
        // if($whitelist === null || in_array('permissions', $whitelist)) $returnValue['permissions'] = Util::PARSE_PERMISSIONS($this->permissions);
        if($whitelist === null || in_array('email', $whitelist)) $returnValue['email'] = $this->email;
        if($whitelist === null || in_array('username', $whitelist)) $returnValue['username'] = $this->username;
        if($whitelist === null || in_array('name', $whitelist)) $returnValue['name'] = $this->name;
        if($whitelist === null || in_array('dni', $whitelist)) $returnValue['dni'] = $this->dni;
        if($whitelist === null || in_array('cart', $whitelist)) $returnValue['cart'] = $this->getCart()?->getId() ?? null;
        if($whitelist === null || in_array('address', $whitelist)) $returnValue['address'] = $this->getAddress()?->getId() ?? null;

        return $returnValue;
    }
}

?>
