<?php

declare(strict_types=1);

namespace System\Handlers;
use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\NotFoundException;
use System\Search\SearchController;

class SearchHandler {

    public function __construct(
        private SearchController $controller = new SearchController(),
    ) {

    }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        switch($subsection) {
            case "users": return $this->doUsers($action, $data);
            default: throw new NotFoundException();
        }
    }

    private function doUsers(string $action, Array $data): ResponseDTO {
        switch($action) {
            case "predict": return $this->predictUsers($data['field'] ?? '', $data['query'] ?? '');
            default: return $this->searchUsers($data['fields'] ?? Array(), $data['page'] ?? '');
        }
    }

    private function predictUsers(string $query): ResponseDTO {
        return new ResponseDTO($this->controller->predictUsers(htmlentities($query)));
    }

}
