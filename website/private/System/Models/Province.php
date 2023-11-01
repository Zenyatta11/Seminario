<?php

declare(strict_types=1);

namespace System\Models;

class Province {

    public function __construct(
        private int $id,
        private string $name,
        private string $iso3166
    ) {}

    public function getName(): string {
        return $this->name;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getISO3166(): string {
        return $this->iso3166;
    }

    public function toArray(): Array {
        return Array(
            "name" => $this->getName(),
            "id" => $this->getId(),
            "ISO3166" => $this->getISO3166()
        );
    }
}

?>