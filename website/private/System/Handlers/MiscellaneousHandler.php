<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Miscellaneous\MiscController;

class MiscellaneousHandler {

    public function __construct(
        private MiscController $controller = new MiscController(),
    ) {

    }

    public function init(string $subsection, string $action, array $data): ResponseDTO {
        switch($subsection) {
            case "provinces": return $this->processProvinces($action, $data);
            case "cities": return $this->processCities($action, $data);
            case "zipcodes": return $this->processZipcodes($action, $data);
            case "categories": return $this->processCategories($action, $data);
            case "subcategories": return $this->processSubCategories($action, $data);
            default: throw new NotFoundException();
        }
    }

    private function processCategories(string $action, array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->controller->getCategories());
            case "new": return new ResponseDTO($this->newCategory($data['name']));
            default: throw new NotFoundException();
        }
    }

    private function processCities(string $action, array $data): ResponseDTO {
        switch($action) {
            case "get": return $this->getCities($data['province_id']);
            default: throw new NotFoundException();
        }
    }

    private function processProvinces(string $action, array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->controller->getProvinces());
            default: throw new NotFoundException();
        }
    }

    private function processSubcategories(string $action, array $data): ResponseDTO {
        switch($action) {
            case "get": return new ResponseDTO($this->controller->getSubCategories());
            case "new": return $this->newSubCategory($data['name'], $data['category_id']);
            default: throw new NotFoundException();
        }
    }

    private function processZipcodes(string $action, array $data): ResponseDTO {
        switch($action) {
            case "verify": return $this->verifyZipcode($data['zip-code'], $data['province_id']);
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

    private function newSubCategory(string $name, string $category_id): ResponseDTO {
        if(empty($category_id) || !is_numeric($category_id)) throw new InvalidArgumentException(Array("ID_MUST_BE_INT"));
        if(empty($name)) throw new InvalidArgumentException(Array("NAME_CANNOT_BE_EMPTY"));
        return new ResponseDTO($this->controller->newSubCategory(htmlentities($name), intval($category_id)));
    }
}
