<?php

declare(strict_types=1);

namespace System\Models;

use System\Miscellaneous\MiscRepository;
use System\Users\UserController;

class Address {
    public function __construct(
        private int $id,
        private User | int $user,
        private int $zipcode,
        private Province $province,
        private City $city,
        private int $number,
        private string $street,
        private string $extra
    ) {}

    public function getUser(): User {
        if(is_int($this->user)) {
            $userController = new UserController();
            $this->user = $userController->getUserById($this->user);
        }

        return $this->user;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getZipcode(): int {
        return $this->zipcode;
    }

    public function getProvince(): Province {
        return $this->province;
    }

    public function getCity(): City {
        return $this->city;
    }

    public function getNumber(): int {
        return $this->number;
    }

    public function getStreet(): string {
        return $this->street;
    }

    public function getExtra(): string {
        return $this->extra;
    }

    public function toArray(): Array {
        return Array(
            "id" => $this->getId(),
            "user" => $this->getUser()->getId(),
            "zipcode" => $this->getZipcode(),
            "province" => $this->getProvince()->toArray(),
            "city" => $this->getCity()->toArray(),
            "number" => $this->getNumber(),
            "street" => $this->getStreet(),
            "extra" => $this->getExtra(),
        );
    }

    public static function BUILD(Array $data) {
        $miscRepository = new MiscRepository();
        
        return new self(
            $data['address_id'],
            $data['user_id'],
            $data['zip_code'],
            $miscRepository->getProvinceById($data['province_id']),
            $miscRepository->getCityById($data['city_id']),
            $data['number'],
            $data['street'],
            $data['extra'] ?? ""
        );
    }
}

?>