<?php

declare(strict_types=1);

namespace System\Models;
use System\Products\ProductController;
use System\Search\SearchController;

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
        private int | null $variantId = null
    ) {}

    public function toArray(): array {
        return Array(
            "id" => $this->id,
            "variant" => $this->variantId ?? "0",
            "category" => $this->category->getId(),
            "subcategory" => $this->subCategory->getId() ?? "null",
            "weight" => $this->weight,
            "price" => $this->price,
            "dimensions" => $this->dimensions->toArray(),
            "stock" => $this->stock,
            "state" => $this->state,
            "name" => $this->name,
            "description" => $this->description
        );
    }

    public function jsonify(): string {
        return json_encode($this->toArray());
    }

    public static function BUILD(array $data): Product {
        $productController = new ProductController();

        if($data['variant_id'])
            $data = $productController->getVariationDataById($data);
        
        $searchController = new SearchController();
        $category = $searchController->getCategoryById($data['category_id']);

        return new Product(
            $data['product_id'],
            $data['weight'],
            $data['price'],
            new Dimension($data['length'], $data['width'], $data['height']),
            $data['stock'],
            $data['state'],
            $data['name'],
            $data['description'],
            $category,
            $searchController->getSubCategoryById($category, $data['subcategory_id']),
            $data['variant_id']
        );
    }

}

?>
