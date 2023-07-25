<?php

declare(strict_types=1);

namespace System\Models;

class Dimension {

    public function __construct(
        private float $length,
        private float $width,
        private float $height,
    ) {}

    public function getLength(): float {
        return $this->length;
    }

    public function getWidth(): float {
        return $this->width;
    }

    public function getHeight(): float {
        return $this->height;
    }

    public function toArray(): array {
        return Array(
            $this->length,
            $this->width,
            $this->height
        );
    }
}

?>