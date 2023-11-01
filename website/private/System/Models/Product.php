<?php

declare(strict_types=1);

namespace System\Models;
use JsonSerializable;
use System\Miscellaneous\MiscController;
use System\Models\States\ProductState;

class Product implements JsonSerializable {

    public function __construct(
        private int $id,
        private float $weight,
        private float $price,
        private Dimension $dimensions,
        private int $stock,
        private string $state,
        private string $name,
        private string $description,
        private Category $category,
        private Subcategory | null $subCategory = null,
        private int | null $variationId = null,
        private float | null $offer = null
    ) {}

    public function getId(): int {
        return $this->id;
    }

    public function getWeight(): float {
        return $this->weight;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function getDimensions(): Dimension {
        return $this->dimensions;
    }

    public function getStock(): int {
        return $this->stock;
    }

    public function getDiscountPrice(): float | null {
        return $this->offer;
    }

    public function getState(): string {
        return $this->state;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getDescription(): string {
        return $this->description;
    }

    public function getCategory(): Category {
        return $this->category;
    }

    public function getSubCategory(): Subcategory | null {
        return $this->subCategory;
    }

    public function getVariationId(): int | null {
        return $this->variationId;
    }

    public function toArray($whitelist = null): Array {
        $returnValue = Array();

        if($whitelist === null || in_array('id', $whitelist)) $returnValue['id'] = $this->getId();
        if($whitelist === null || in_array('weight', $whitelist)) $returnValue['weight'] = $this->getWeight();
        if($whitelist === null || in_array('price', $whitelist)) $returnValue['price'] = $this->getPrice();
        if($whitelist === null || in_array('stock', $whitelist)) $returnValue['stock'] = $this->getStock();
        if($whitelist === null || in_array('state', $whitelist)) $returnValue['state'] = ProductState::FROM_VALUE($this->getState());
        if($whitelist === null || in_array('name', $whitelist)) $returnValue['name'] = $this->getName();
        if($whitelist === null || in_array('description', $whitelist)) $returnValue['description'] = $this->getDescription();
        if($whitelist === null || in_array('variationId', $whitelist)) $returnValue['variationId'] = $this->getVariationId() ?? '';
        if($whitelist === null || in_array('offer', $whitelist)) $returnValue['offer'] = $this->getDiscountPrice() ?? '';

        if($whitelist === null || in_array('dimensions', $whitelist)) $returnValue['dimensions'] = $this->getDimensions()->toArray();

        if($whitelist === null || in_array('category', $whitelist)) $returnValue['category'] = $this->getCategory()->toArray();

        if($whitelist === null || in_array('subcategory', $whitelist)) 
            $returnValue['subcategory'] = ($this->getSubCategory() === null ? '' : $this->getSubCategory()->toArray());

        return $returnValue;
    }

    public function jsonSerialize(): Array {
        return $this->toArray();
    }

    public static function BUILD(Array $data): Product {
        //$productController = new ProductController();

        //if(isset($data['variation_id']))
        //    $data = $productController->getVariationDataById($data);

        $miscController = new MiscController();
        $category = $miscController->getCategoryById($data['category_id']);

        return new Product(
            $data['product_id'],
            $data['weight'],
            $data['price'],
            
            new Dimension(
                $data['length'], 
                $data['width'], 
                $data['height']
            ),

            $data['stock'],
            $data['state'],
            $data['name'],
            $data['description'],
            $category,
            $miscController->getSubCategoryById($category, $data['subcategory_id']),
            $data['variation_id'] ?? null,
            $data['offer'] ?? null
        );
    }

}

?>
