<?php

declare(strict_types=1);

namespace System\Models;

class Review {

    public function __construct(
        private int $id,
        private string $title,
        private string $description,
        private int $stars,
        private User $author
    ) {}

    public function getAuthor(): User {
        return $this->author;
    }

    public function getTitle(): string {
        return $this->title;
    }

    public function getDescription(): string {
        return $this->description;
    }

    public function getStars(): int {
        return $this->stars;
    }

    public function getId(): int {
        return $this->id;
    }
}

?>