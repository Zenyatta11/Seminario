<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\NotLoggedInException;
use System\Miscellaneous\MiscController;
use System\Router;

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
            case "address": return $this->processAddresses($action, $data);
            case "categories": return $this->processCategories($action, $data);
            case "subcategories": return $this->processSubCategories($action, $data);
            case "questions": return $this->processQuestions($action, $data);
            case "response": return $this->processResponses($action, $data);
            case "review": return $this->processReview($action, $data);
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
            case "new": return new ResponseDTO($this->createReview($data['product_id'] ?? "", $data['stars'] ?? "", $data['title'] ?? "", $data['description'] ?? ""));
            case "delete": return new ResponseDTO($this->deleteReview($data['review_id'] ?? ""));
            case "update": return new ResponseDTO(
                $this->updateReview(
                    $data['review_id'] ?? "",
                    $data['stars'] ?? "",
                    $data['title'] ?? "",
                    $data['description'] ?? ""
                )
            );
            default: throw new NotFoundException();
        }
    }

    private function processQuestions(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "product": return new ResponseDTO($this->getQuestionsByProductId($data['product_id'] ?? ""));
            case "user": return new ResponseDTO($this->getQuestionsByUserId($data['user_id'] ?? ""));
            case "new": return new ResponseDTO($this->newQuestion($data['product_id'] ?? "", $data['question'] ?? ""));
            case "respond": return new ResponseDTO($this->respondTo($data['question_id'] ?? "", $data['response'] ?? ""));
            case "delete": return new ResponseDTO($this->deleteQuestion($data['question_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateQuestion($data['question_id'] ?? "", $data['question'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processResponses(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "delete": return new ResponseDTO($this->deleteResponse($data['response_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateResponse($data['response_id'] ?? "", $data['response'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function getQuestionsByProductId(string $productId): Array {
        if(empty($productId) || !is_numeric($productId)) throw new InvalidArgumentException("PRODUCT_ID_MUST_BE_INT");
        return $this->controller->getQuestionsByProductId(intval($productId));
    }

    private function getQuestionsByUserId(string $userId): Array {
        if(empty($userId) || !is_numeric($userId)) throw new InvalidArgumentException("USER_ID_MUST_BE_INT");
        return $this->controller->getQuestionsByUserId(intval($userId));
    }
    
    private function newQuestion(string $productId, string $message): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($productId) || !is_numeric($productId)) $errors[] = "PRODUCT_ID_MUST_BE_INT";
        if(empty($message)) $errors[] = "QUESTION_CANNOT_BE_EMPTY";
        if(!empty($errors)) throw new InvalidArgumentException($errors);
        
        return $this->controller->newQuestion(intval($productId), $message);
    }

    private function deleteQuestion(string $questionId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
        
        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        return $this->controller->deleteQuestion(intval($questionId));
    }

    private function updateQuestion(string $questionId, string $message): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($questionId) || !is_numeric($questionId)) $errors[] = "QUESTION_ID_MUST_BE_INT";
        if(empty($message)) $errors[] = "QUESTION_CANNOT_BE_EMPTY";
        if(!empty($errors)) throw new InvalidArgumentException($errors);

        return $this->controller->updateQuestion(intval($questionId), $message);
    }

    private function respondTo(string $questionId, string $response): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($questionId) || !is_numeric($questionId)) $errors[] = "QUESTION_ID_MUST_BE_INT";
        if(empty($message)) $errors[] = "RESPONSE_CANNOT_BE_EMPTY";
        if(!empty($errors)) throw new InvalidArgumentException($errors);

        return $this->controller->respondTo(intval($questionId), $response);
    }

    private function deleteResponse(string $questionId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($questionId) || !is_numeric($questionId)) throw new InvalidArgumentException("QUESTION_ID_MUST_BE_INT");
        return $this->controller->deleteResponse(intval($questionId));
    }

    private function updateResponse(string $questionId, string $message): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($questionId) || !is_numeric($questionId)) $errors[] = "QUESTION_ID_MUST_BE_INT";
        if(empty($message)) $errors[] = "RESPONSE_CANNOT_BE_EMPTY";
        if(!empty($errors)) throw new InvalidArgumentException($errors);

        return $this->controller->updateResponse(intval($questionId), $message);
    }

    private function createReview(string $productId, string $stars, string $title, string $description): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($productId) || !is_numeric($productId)) $errors[] = "PRODUCT_ID_MUST_BE_INT";
        if(empty($stars) || !is_numeric($stars)) $errors[] = "STARS_MUST_BE_INT";
        if(!empty($stars) && is_numeric($stars) && !($stars >= 0 && $stars <= 5)) $errors[] = "STARS_MUST_BE_1_TO_5";
        if(empty($title)) $errors[] = "TITLE_CANNOT_BE_EMPTY";
        if(empty($description)) $errors[] = "DESCRIPTION_CANNOT_BE_EMPTY";
        if(!empty($errors)) throw new InvalidArgumentException($errors);
        
        return $this->controller->createReview(intval($productId), intval($stars), $title, $description);
    }

    private function deleteReview(string $reviewId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($reviewId) || !is_numeric($reviewId)) throw new InvalidArgumentException("REVIEW_ID_MUST_BE_INT");
        return$this->controller->deleteReview(intval($reviewId));
    }

    private function updateReview(string $reviewId, string $stars, string $title, string $description): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();
        if(empty($reviewId) || !is_numeric($reviewId)) $errors[] = "REVIEW_ID_MUST_BE_INT";
        if(empty($stars) || !is_numeric($stars)) $errors[] = "STARS_MUST_BE_INT";
        if(!empty($stars) && is_numeric($stars) && !($stars >= 0 && $stars <= 5)) $errors[] = "STARS_MUST_BE_1_TO_5";
        if(empty($title)) $errors[] = "TITLE_CANNOT_BE_EMPTY";
        if(empty($description)) $errors[] = "DESCRIPTION_CANNOT_BE_EMPTY";
        if(!empty($errors)) throw new InvalidArgumentException($errors);

        return $this->controller->updateReview(intval($reviewId), intval($stars), $title, $description);
    }

    private function getReviewsByProductId(string $reviewId): Array {
        if(empty($reviewId) || !is_numeric($reviewId)) throw new InvalidArgumentException("PRODUCT_ID_MUST_BE_INT");
        return $this->controller->getReviewsByProductId(intval($reviewId));
    }

    private function getReviewsByUserId(string $userId): Array {
        if(empty($userId) || !is_numeric($userId)) throw new InvalidArgumentException("USER_ID_MUST_BE_INT");
        return $this->controller->getReviewsByUserId(intval($userId));
    }

    private function processCities(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->getCities($data['province_id'] ?? ""));
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
            case "get": return new ResponseDTO($this->getSubCategories($data['category_id'] ?? ""));
            case "new": return new ResponseDTO($this->newSubCategory($data['name'] ?? "", $data['category_id'] ?? ""));
            case "delete": return new ResponseDTO($this->deleteSubCategory($data['subcategory_id'] ?? "", $data['category_id'] ?? ""));
            case "update": return new ResponseDTO($this->updateSubCategory($data['name'] ?? "", $data['subcategory_id'] ?? "", $data['category_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processZipcodes(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "verify": return new ResponseDTO($this->verifyZipcode($data['zip-code'] ?? "", $data['province_id'] ?? ""));
            default: throw new NotFoundException();
        }
    }

    private function processAddresses(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->getUserAddresses());
            case "delete": return new ResponseDTO($this->deleteAddress($data['address_id'] ?? ""));
            case "update": return new ResponseDTO(
                    $this->updateAddress(
                        $data['address_id'] ?? "", 
                        $data['province_id'] ?? "", 
                        $data['city_id'] ?? "", 
                        $data['zip_code'] ?? "", 
                        $data['street'] ?? "", 
                        $data['number'] ?? "", 
                        $data['extra'] ?? "", 
                    )
                );
            case "create": return new ResponseDTO(
                    $this->createAddress(
                        $data['province_id'] ?? "", 
                        $data['city_id'] ?? "", 
                        $data['zip_code'] ?? "", 
                        $data['street'] ?? "", 
                        $data['number'] ?? "", 
                        $data['extra'] ?? "", 
                    )
                );
            default: throw new NotFoundException();
        }
    }

    private function getUserAddresses(): Array {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        return $this->controller->getAddressesByUserId(Router::$CURRENT_USER->getId());
    }

    private function deleteAddress(string $addressId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
        if(empty($addressId) || !is_numeric($addressId)) throw new InvalidArgumentException("INVALID_ADDRESS_ID");

        $address = $this->controller->getAddressById(intval($addressId));
        if(!$address) throw new NotFoundException("ADDRESS_ID");

        return $this->controller->deleteAddress($address);
    }

    private function verifyZipcode(string $zipcode, $province_id): bool {
        if(empty($zipcode) || !is_numeric($zipcode)) throw new InvalidArgumentException(Array("ZIPCODE_MUST_BE_INT"));
        if(empty($province_id) || !is_numeric($province_id)) throw new InvalidArgumentException(Array("PROVINCE_ID_MUST_BE_INT"));
        $valid = $this->controller->verifyZipcode(intval($zipcode), intval($province_id));
        if($valid) return true;
        else throw new InvalidArgumentException(Array("ZIPCODE_DOES_NOT_MATCH_PROVINCE"));
    }
    
    private function getCities(string $province): Array {
        if(empty($province) || !is_numeric($province)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        return $this->controller->getCitiesByProvinceId(intval($province));
    }

    private function newCategory(string $name): bool {
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));

        return $this->controller->newCategory(htmlentities($name));
    }

    private function deleteCategory(string $id): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));

        return $this->controller->deleteCategory(intval($id));
    }

    private function updateCategory(string $name, $id): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));

        return $this->controller->updateCategory(htmlentities($name), intval($id));
    }

    private function newSubCategory(string $name, string $categoryId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));
        return $this->controller->newSubCategory(htmlentities($name), intval($categoryId));
    }

    private function getSubCategories(string $categoryId): Array {
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        return $this->controller->getSubCategories(intval($categoryId));
    }

    private function deleteSubCategory(string $id, string $categoryId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("CATEGORY_ID_MUST_BE_INT"));

        return $this->controller->deleteSubCategory(intval($id), intval($categoryId));
    }

    private function updateSubCategory(string $name, string $id, string $categoryId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        if(empty($id) || !is_numeric($id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($categoryId) || !is_numeric($categoryId)) throw new InvalidArgumentException(Array("CATEGORY_ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));

        return $this->controller->updateSubCategory(htmlentities($name), intval($id), intval($categoryId));
    }

    private function updateAddress(string $addressId, string $provinceId, string $cityId, string $zipCode, string $street, string $number, string $extra): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($addressId) || !is_numeric($addressId)) $errors['INVALID_ADDRESS_ID'];
        if(empty($provinceId) || !is_numeric($provinceId)) $errors['INVALID_PROVINCE_ID'];
        if(empty($cityId) || !is_numeric($cityId)) $errors['INVALID_CITY_ID'];
        if(empty($zipCode) || !is_numeric($zipCode)) $errors['INVALID_ZIP_CODE'];
        if(empty($street)) $errors['EMPTY_STREET'];
        if(empty($number) || !is_numeric($number)) $errors['INVALID_STREET_NUMBER'];

        if(count($errors) != 0) throw new InvalidArgumentException($errors);

        return $this->controller->updateAddress(intval($addressId), intval($provinceId), intval($cityId), intval($zipCode), $street, intval($number), $extra);
    }

    private function createAddress(string $provinceId, string $cityId, string $zipCode, string $street, string $number, string $extra): bool | int {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

        $errors = Array();

        if(empty($provinceId) || !is_numeric($provinceId)) $errors['INVALID_PROVINCE_ID'];
        if(empty($zipCode) || !is_numeric($zipCode)) $errors['INVALID_ZIP_CODE'];
        if(empty($cityId) || !is_numeric($cityId)) $errors['INVALID_CITY_ID'];
        if(empty($street)) $errors['EMPTY_STREET'];
        if(empty($number) || !is_numeric($number)) $errors['INVALID_STREET_NUMBER'];

        if(count($errors) != 0) throw new InvalidArgumentException($errors);

        return $this->controller->createAddress(intval($provinceId), intval($cityId), intval($zipCode), $street, intval($number), $extra);
    }
    
}
