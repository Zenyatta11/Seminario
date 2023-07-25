<?php

declare(strict_types=1);

namespace System\Models;

class Category {

    public function __construct(
        private int $id,
        private string $name
    ) {}

    public function getName(): string {
        return $this->name;
    }

    public function getId(): int {
        return $this->id;
    }
}

?>