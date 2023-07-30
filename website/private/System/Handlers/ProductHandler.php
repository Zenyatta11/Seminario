<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Products\ProductController;

class ProductHandler {

    public function __construct(
        private ProductController $controller = new ProductController(),
    ) {

    }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($action) {
            case "new": return $this->createProduct(
                    $data['category_id'] ?? '', $data['subcategory_id'] ?? '', $data['weight'] ?? '', 
                    $data['price'] ?? '', $data['stock'] ?? '', $data['width'] ?? '', 
                    $data['height'] ?? '', $data['length'] ?? '', $data['state'] ?? '', 
                    $data['name'] ?? '', $data['description'] ?? '', );
            default: return new ResponseDTO();
        }
    }

    private function createProduct(
        string $categoryId, string $subcategoryId, string $weight, 
        string $price, string $stock, string $width, string $height, 
        string $length, string $state, string $name, string $description
    ): ResponseDTO {
        $errors = Array();
        if(empty($weight)) $errors[] = "MISSING_WEIGHT";
        else if(!is_numeric($weight)) $errors[] = "INVALID_WEIGHT";

        if(empty($price)) $errors[] = "MISSING_PRICE";
        else if(!is_numeric($price)) $errors[] = "INVALID_PRICE";

        if(empty($length)) $errors[] = "MISSING_LENGTH";
        else if(!is_numeric($length)) $errors[] = "INVALID_LENGTH";

        if(empty($width)) $errors[] = "MISSING_WIDTH";
        else if(!is_numeric($width)) $errors[] = "INVALID_WIDTH";

        if(empty($height)) $errors[] = "MISSING_HEIGHT";
        else if(!is_numeric($height)) $errors[] = "INVALID_HEIGHT";

        if(empty($stock)) $errors[] = "MISSING_STOCK";
        else if(!is_numeric($stock)) $errors[] = "INVALID_STOCK";
        else if(intval($stock) < 0) $errors[] = "NEGATIVE_STOCK";

        if(empty($categoryId)) $errors[] = "MISSING_CATEGORY";
        else if(!is_numeric($categoryId)) $errors[] = "INVALID_CATEGORY";

        if(!empty($subcategoryId) && !is_numeric($subcategoryId)) $errors[] = "INVALID_SUBCATEGORY";

        if(empty($name)) $errors[] = "MISSING_NAME";
        if(empty($description)) $errors[] = "MISSING_DESCRIPTION";

        if(!empty($errors)) throw new InvalidArgumentException($errors);

        return new ResponseDTO($this->controller->createProduct(
            intval($categoryId), (empty($subcategoryId) ? null : intval($subcategoryId)), 
            floatval($weight), floatval($price), intval($stock), floatval($width), 
            floatval($height), floatval($length), $state, htmlentities($name), htmlentities($description)
        ));
    }

}
