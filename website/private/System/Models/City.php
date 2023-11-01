<?php

declare(strict_types=1);

namespace System\Models;

class City {

    public function __construct(
        private int $id,
        private string $name,
        private Province $province
    ) {}

    public function getName(): string {
        return $this->name;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getProvince(): Province {
        return $this->province;
    }

    public function toArray(): Array {
        return Array(
            "name" => $this->getName(),
            "id" => $this->getId(),
            "province" => $this->getProvince()->toArray()
        );
    }
}

?>