<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Miscellaneous\MiscController;

class MiscellaneousHandler {

    public function __construct(
        private MiscController $controller = new MiscController()
    ) {

    }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($subsection) {
            case "provinces": return $this->processProvinces($action, $data);
            case "cities": return $this->processCities($action, $data);
            case "zipcodes": return $this->processZipcodes($action, $data);
            case "categories": return $this->processCategories($action, $data);
            case "subcategories": return $this->processSubCategories($action, $data);
            case "questions": return $this->processQuestions($action, $data);
            case "response": return $this->processResponses($action, $data);
            case "review": return $this->processReview($action, $data);
            case "media": return $this->processMediaRequest($subsection, $action);
            default: throw new NotFoundException();
        }
    }

    private function processCategories(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->controller->getCategories());
            case "getWithSub": return new ResponseDTO($this->controller->getCategoriesWithSubcategories());
            case "new": return new ResponseDTO($this->newCategory($data['name'] ?? ""));
            case "delete": return new ResponseDTO($this->deleteCategory($data['category_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateCategory($data['name'] ?? "", $data['category_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processReview(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "product": return new ResponseDTO($this->getReviewsByProductId($data['product_id'] ?? ""));
            case "user": return new ResponseDTO($this->getReviewsByUserId($data['user_id'] ?? ""));
            case "new": return new ResponseDTO($this->createReview($data['product_id'] ?? ""));
            case "delete": return new ResponseDTO($this->deleteReview($data['review_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateReview($data['review_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processQuestions(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "product": return new ResponseDTO($this->getQuestionsByProductId($data['product_id'] ?? ""));
            case "user": return new ResponseDTO($this->getQuestionsByUserId($data['user_id'] ?? ""));
            case "new": return new ResponseDTO($this->newQuestion($data['product_id'] ?? ""));
            case "respond": return new ResponseDTO($this->respondTo($data['question_id'] ?? ""));
            case "delete": return new ResponseDTO($this->deleteQuestion($data['question_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateQuestion($data['question_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processResponses(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "delete": return new ResponseDTO($this->deleteQuestion($data['question_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateQuestion($data['question_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function getQuestionsByProductId(string $productId) {
        if(empty($productId) || !is_numeric($productId)) throw new InvalidArgumentException("PRODUCT_ID_MUST_BE_INT");
        $this->controller->getQuestionsByProductId(intval($productId));
    }

    private function getQuestionsByUserId(string $userId) {
        if(empty($userId) || !is_numeric($userId)) throw new InvalidArgumentException("USER_ID_MUST_BE_INT");
        $this->controller->getQuestionsByUserId(intval($userId));
    }
    
    private function newQuestion(string $productId) {
        if(empty($productId) || !is_numeric($productId)) throw new InvalidArgumentException("PRODUCT_ID_MUST_BE_INT");
        $this->controller->newQuestion(intval($productId));
    }

    private function deleteQuestion(string $questionId) {
        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        $this->controller->deleteQuestion(intval($questionId));
    }

    private function updateQuestion(string $questionId) {
        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        $this->controller->updateQuestion(intval($questionId));
    }

    private function respondTo(string $questionId) {
        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        $this->controller->respondTo(intval($questionId));
    }

    private function deleteResponse(string $questionId) {
        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        $this->controller->deleteResponse(intval($questionId));
    }

    private function updateResponse(string $questionId) {
        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        $this->controller->updateResponse(intval($questionId));
    }

    private function createReview(string $productId) {
        if(empty($productId) || !is_numeric($productId)) throw new InvalidArgumentException("PRODUCT_ID_MUST_BE_INT");
        $this->controller->createReview(intval($productId));
    }

    private function deleteReview(string $reviewId) {
        if(empty($reviewId) || !is_numeric($reviewId)) throw new InvalidArgumentException("REVIEW_ID_MUST_BE_INT");
        $this->controller->deleteReview(intval($reviewId));
    }

    private function updateReview(string $reviewId) {
        if(empty($reviewId) || !is_numeric($reviewId)) throw new InvalidArgumentException("REVIEW_ID_MUST_BE_INT");
        $this->controller->updateReview(intval($reviewId));
    }

    private function getReviewsByProductId(string $reviewId) {
        if(empty($reviewId) || !is_numeric($reviewId)) throw new InvalidArgumentException("PRODUCT_ID_MUST_BE_INT");
        $this->controller->getReviewsByProductId(intval($reviewId));
    }

    private function getReviewsByUserId(string $userId) {
        if(empty($userId) || !is_numeric($userId)) throw new InvalidArgumentException("USER_ID_MUST_BE_INT");
        $this->controller->getReviewsByUserId(intval($userId));
    }

    private function processCities(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "get": return $this->getCities($data['province_id'] ?? "");
            default: throw new NotFoundException();
        }
    }

    private function processProvinces(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->controller->getProvinces());
            default: throw new NotFoundException();
        }
    }

    private function processSubcategories(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "get": return $this->getSubCategories($data['category_id'] ?? "");
            case "new": return $this->newSubCategory($data['name'] ?? "", $data['category_id'] ?? "");
            case "delete": return new ResponseDTO($this->deleteSubCategory($data['subcategory_id'] ?? "", $data['category_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateSubCategory($data['name'] ?? "", $data['subcategory_id'] ?? "", $data['category_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processZipcodes(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "verify": return $this->verifyZipcode($data['zip-code'] ?? "", $data['province_id'] ?? "");
            default: throw new NotFoundException();
        }
    }

    private function processMediaRequest(string $section, string $action): ResponseDTO {
        switch($section) {
            case "products": return $this->getProductsImage($action);
            case "index": return $this->getPageImage($action);
            default: throw new NotFoundException();
        }
    }

    private function verifyZipcode(string $zipcode, $province_id): ResponseDTO {
        if(empty($zipcode) || !is_numeric($zipcode)) throw new InvalidArgumentException(Array("ZIPCODE_MUST_BE_INT"));
        if(empty($province_id) || !is_numeric($province_id)) throw new InvalidArgumentException(Array("PROVINCE_ID_MUST_BE_INT"));
        $valid = $this->controller->verifyZipcode(intval($zipcode), intval($province_id));
        if($valid) return new ResponseDTO(true);
        else throw new InvalidArgumentException(Array("ZIPCODE_DOES_NOT_MATCH_PROVINCE"));
    }
    
    private function getCities(string $province) {
        if(empty($province) || !is_numeric($province)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        return new ResponseDTO($this->controller->getCitiesByProvinceId(intval($province)));
    }

    private function newCategory(string $name): ResponseDTO {
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));

        return new ResponseDTO($this->controller->newCategory(htmlentities($name)));
    }

    private function deleteCategory(string $id): ResponseDTO {
        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));

        return new ResponseDTO($this->controller->deleteCategory(intval($id)));
    }

    private function updateCategory(string $name, $id): ResponseDTO {
        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));

        return new ResponseDTO($this->controller->updateCategory(htmlentities($name), intval($id)));
    }

    private function newSubCategory(string $name, string $categoryId): ResponseDTO {
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));
        return new ResponseDTO($this->controller->newSubCategory(htmlentities($name), intval($categoryId)));
    }

    private function getSubCategories(string $categoryId): ResponseDTO {
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        return new ResponseDTO($this->controller->getSubCategories(intval($categoryId)));
    }

    private function deleteSubCategory(string $id, string $categoryId): ResponseDTO {
        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("CATEGORY_ID_MUST_BE_INT"));

        return new ResponseDTO($this->controller->deleteSubCategory(intval($id), intval($categoryId)));
    }

    private function updateSubCategory(string $name, string $id, string $categoryId): ResponseDTO {
        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("CATEGORY_ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));

        return new ResponseDTO($this->controller->updateSubCategory(htmlentities($name), intval($id), intval($categoryId)));
    }
}
