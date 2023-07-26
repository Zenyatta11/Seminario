<?php

declare(strict_types=1);

namespace System\Models;
use System\Miscellaneous\MiscController;
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

    public function jsonify($whitelist = null): string {
        $returnValue = Array();

        if($whitelist === null || in_array('id', $whitelist)) $returnValue['id'] = $this->id;
        if($whitelist === null || in_array('weight', $whitelist)) $returnValue['weight'] = $this->weight;
        if($whitelist === null || in_array('price', $whitelist)) $returnValue['price'] = $this->price;
        if($whitelist === null || in_array('stock', $whitelist)) $returnValue['stock'] = $this->stock;
        if($whitelist === null || in_array('state', $whitelist)) $returnValue['state'] = $this->state;
        if($whitelist === null || in_array('name', $whitelist)) $returnValue['name'] = $this->name;
        if($whitelist === null || in_array('description', $whitelist)) $returnValue['description'] = $this->description;
        if($whitelist === null || in_array('variantId', $whitelist)) $returnValue['variantId'] = $this->variantId ?? '';
         
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

        return json_encode($returnValue);
    }

    public static function BUILD(Array $data): Product {
        $productController = new ProductController();

        if($data['variant_id'])
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
            $data['variant_id']
        );
    }

}

?>
