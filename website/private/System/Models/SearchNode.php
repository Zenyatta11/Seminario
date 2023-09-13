<?php

declare(strict_types=1);

namespace System\Models;

class SearchNode {

    public function __construct(
        private Array $children = Array(),
        private int | null $id = null
    ) {}

    public function getChild(string $index): SearchNode | null {
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

	public function addChild(Array $names, int $value): void {
		$namesArray = array_reverse($names);
		$name = array_pop($namesArray);
        $namesArray = array_reverse($namesArray);

        

		if(empty($namesArray)) $this->children[$name] = new SearchNode(Array(), $value);
		else if($this->getChild($name) !== null) $this->getChild($name)->addChild($namesArray, $value);
		else {
			$node = new SearchNode();
			$node->addChild($namesArray, $value);
			$this->children[$name] = $node;
		}
	}
}

?>
