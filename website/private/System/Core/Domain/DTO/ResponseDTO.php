<?php

declare(strict_types=1);

namespace System\Core\Domain\DTO;

use System\Core\Domain\Util\HttpStatusCode;

class ResponseDTO {

    public function __construct(
        private mixed $data = null, 
        private int $statusCode = HttpStatusCode::OK
    ) { }

    public function jsonify(): string {
        $returnValue = Array();
        $returnValue["status_code"] = $this->statusCode;
        $returnValue["data"] = ($this->data ?? "");

        return json_encode($returnValue);
    }

    public function getData(): mixed {
        return $this->data;
    }
}

?>
