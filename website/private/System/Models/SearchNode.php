<?php

declare(strict_types=1);

namespace System\Models;

class SearchNode {

    public function __construct(
        private Array $children,
        private int | null $id = null
    ) {}

    public function getChild(mixed $index): SearchNode | null {
        return $this->children[$index] ?? null;
    }

    public function getId(): int | null {
        return $this->id;
    }

	public function toArray(): Array {
		$childrenArray = Array();

		foreach($this->children as $key => $child) {
			$childrenArray[$key] = $child->toArray();
		}

		return Array(
			'children' => $childrenArray,
			'id' => $this->id
		);
	}
}

?>
