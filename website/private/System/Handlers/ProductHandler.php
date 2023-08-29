<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Products\ProductController;

class ProductHandler {

    public function __construct(
        private ProductController $controller = new ProductController(),
    ) {

    }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($subsection) {
            case "get": return $this->getProducts($action);
            default: return $this->doUncategorized($action, $data);
        }
    }

    private function doUncategorized(string $action, Array $data) {
        switch($action) {
            case "new": return $this->createProduct(
                $data['category_id'] ?? '', $data['subcategory_id'] ?? '', $data['weight'] ?? '', 
                $data['price'] ?? '', $data['stock'] ?? '', $data['width'] ?? '', 
                $data['height'] ?? '', $data['length'] ?? '', $data['state'] ?? '', 
                $data['name'] ?? '', $data['description'] ?? '');

            case "delete": return $this->deleteProduct($data['product_id'] ?? '', $data['variation_id'] ?? '');

            case "get": return $this->getProduct($data['product_id'] ?? '', $data['variation_id'] ?? '');
            default: throw new NotFoundException();
        }
    }

    private function getProducts(string $urlId) {
        $matches = Array();
        if($urlId == "featured") {
            return new ResponseDTO($this->controller->getFeaturedProducts());
        } else if($urlId == "offers") {
            return new ResponseDTO($this->controller->getDiscountProducts());
        } else if($urlId == "new") {
            return new ResponseDTO($this->controller->getLatestProducts());
        } else if(preg_match('/(\d+)-(\d+)_.*/', 'foobarbaz', $matches, PREG_OFFSET_CAPTURE)) {
            return new ResponseDTO($this->controller->getProductVariationById(intval($matches[1]), intval($matches[2])));
        } else if(preg_match('/(\d+)_.*/', 'foobarbaz', $matches, PREG_OFFSET_CAPTURE)) {
            return new ResponseDTO($this->controller->getProductById(intval($matches[1])));
        } else throw new NotFoundException();
    }

    private function getProduct(string $id, string $variationId): ResponseDTO {
        $errors = Array();
        if(empty($id)) $errors[] = "MISSING_ID";
        else if(!is_numeric($id)) $errors[] = "INVALID_ID";

        if(!empty($variationId) && !is_numeric($variationId)) $errors[] = "INVALID_VARIATION_ID";

        if(!empty($errors)) throw new InvalidArgumentException($errors);

        if(!empty($variationId)) return new ResponseDTO($this->controller->getProductVariationById(intval($id), intval($variationId)));
        return new ResponseDTO($this->controller->getProductById(intval($id))->toArray());
    }

    private function deleteProduct(string $id, string $variationId): ResponseDTO {
        $errors = Array();
        if(empty($id)) $errors[] = "MISSING_ID";
        else if(!is_numeric($id)) $errors[] = "INVALID_ID";

        if(!empty($variationId) && !is_numeric($variationId)) $errors[] = "INVALID_VARIATION_ID";

        if(!empty($errors)) throw new InvalidArgumentException($errors);

        return new ResponseDTO($this->controller->deleteProduct(intval($id), intval($variationId)));
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
