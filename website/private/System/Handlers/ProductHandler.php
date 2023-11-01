<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Miscellaneous\MiscController;
use System\Products\ProductController;

class ProductHandler {

    public function __construct(
        private ProductController $controller = new ProductController(),
        private MiscController $miscController = new MiscController()
    ) {

    }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($subsection) {
            case "get": return $this->getProducts($action, $data['name'] ?? "");
            default: return $this->doUncategorized($action, $data);
        }
    }

    private function doUncategorized(string $action, Array $data): ResponseDTO {
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

    private function getProducts(string $urlId, $query): ResponseDTO {
        $matches = Array();

        if($urlId == "search") {
            return new ResponseDTO($this->controller->getProductsByQuery($query));
        } else if($urlId == "featured") {
            return new ResponseDTO($this->controller->getFeaturedProducts());
        } else if($urlId == "offers") {
            return new ResponseDTO($this->controller->getDiscountProducts());
        } else if($urlId == "latest") {
            return new ResponseDTO($this->controller->getLatestProducts());
        } else if(preg_match('/(\d+)-(\d+)_.*/', $urlId, $matches, PREG_OFFSET_CAPTURE)) {
            $category = $this->miscController->getCategoryById(intval($matches[1][0]));
            if($category === null) throw new NotFoundException();

            $subcategory = $this->miscController->getSubCategoryById($category, intval($matches[2][0]));
            if($subcategory === null) throw new NotFoundException();

            return new ResponseDTO($this->controller->getProductsBySubcategory($subcategory));
        } else if(preg_match('/(\d+)_.*/', $urlId, $matches, PREG_OFFSET_CAPTURE)) {
            $category = $this->miscController->getCategoryById(intval($matches[1][0]));
            if($category === null) throw new NotFoundException();

            return new ResponseDTO($this->controller->getProductsByCategory($category));
        } else return new ResponseDTO($this->controller->getProducts());
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
