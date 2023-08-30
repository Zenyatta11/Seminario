<?php

declare(strict_types=1);

namespace System\Models;

class Response {

    public function __construct(
        private int $id,
        private string $message,
        private Question $answersTo,
        private User $author,
		private Product $product
    ) {}

    public function getAuthor(): User {
        return $this->author;
    }

    public function getMessage(): string {
        return $this->message;
    }

    public function getProduct(): Product {
        return $this->product;
    }

    public function getId(): int {
        return $this->id;
    }

	public function getOriginalQuestion(): Question {
        return $this->answersTo;
    }
}

?>
