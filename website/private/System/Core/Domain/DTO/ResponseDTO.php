<?php

declare(strict_types=1);

namespace System\Core\Domain\DTO;

use System\Core\Domain\HttpStatusCode;

class ResponseDTO {
    private string $statusCode;
    private mixed $data;

    public function __construct(mixed $data = null, string $statusCode = HttpStatusCode::OK) {
        $this->$data = $data;
        $this->$statusCode = $statusCode;
    }

    private function jsonify(): string {
        $returnValue = Array();
        $returnValue["status_code"] = $statusCode;
        $returnValue["data"] = ($data == null ? "" : $data);

        return json_encode($returnValue);
    }
}

?>
