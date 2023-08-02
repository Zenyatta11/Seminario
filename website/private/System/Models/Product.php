<?php

declare(strict_types=1);

namespace System\Models;
use System\Core\Exceptions\InvalidArgumentException;
use System\Miscellaneous\MiscController;
use System\Products\ProductController;

class Product {

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
        private int | null $variationId = null
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

    public function getvariationId(): int | null {
        return $this->variationId;
    }

    public function toArray($whitelist = null): Array {
        $returnValue = Array();

        if($whitelist === null || in_array('id', $whitelist)) $returnValue['id'] = $this->id;
        if($whitelist === null || in_array('weight', $whitelist)) $returnValue['weight'] = $this->weight;
        if($whitelist === null || in_array('price', $whitelist)) $returnValue['price'] = $this->price;
        if($whitelist === null || in_array('stock', $whitelist)) $returnValue['stock'] = $this->stock;
        if($whitelist === null || in_array('state', $whitelist)) $returnValue['state'] = $this->state;
        if($whitelist === null || in_array('name', $whitelist)) $returnValue['name'] = $this->name;
        if($whitelist === null || in_array('description', $whitelist)) $returnValue['description'] = $this->description;
        if($whitelist === null || in_array('variationId', $whitelist)) $returnValue['variationId'] = $this->variationId ?? '';

        if($whitelist === null || in_array('dimensions', $whitelist)) $returnValue['dimensions'] = Array(
            'length' => $this->dimensions->getLength(),
            'height' => $this->dimensions->getHeight(),
            'width' => $this->dimensions->getWidth()
        );

        if($whitelist === null || in_array('category', $whitelist)) $returnValue['category'] = Array(
            'name' => $this->category->getName(),
            'id' => $this->category->getId()
        );

        if($whitelist === null || in_array('subcategory', $whitelist)) 
            $returnValue['subcategory'] = ($this->subCategory === null ? '' : Array(
                'name' => $this->subCategory->getName(),
                'id' => $this->subCategory->getId()
            )
        );

        return $returnValue;
    }

    public static function BUILD(Array $data): Product {
        $productController = new ProductController();

        if($data['variation_id'])
            $data = $productController->getVariationDataById($data);
        
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
            $data['variation_id']
        );
    }

}

?>
