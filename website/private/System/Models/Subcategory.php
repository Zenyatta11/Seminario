<?php

declare(strict_types=1);

namespace System\Models;

class Subcategory {

    public function __construct(
        private int $id,
        private string $name,
        private Category $category
    ) {}

    public function getName(): string {
        return $this->name;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getCategory(): Category {
        return $this->category;
    }

    public function toArray(): Array {
        return Array(
            "name" => $this->getName(),
            "id" => $this->getId(),
            "category" => $this->getCategory()->toArray()
        );
    }
}

?>