<?php

declare(strict_types=1);

namespace System\Core\Domain\DTO;

use System\Core\Domain\HttpStatusCode;

class ResponseDTO {
    private string $statusCode = HttpStatusCode::OK;
    private mixed $data;

    private function jsonify(): string {
        $returnValue = Array();
        $returnValue["status_code"] = $statusCode;
        $returnValue["data"] = $data;

        return json_encode($returnValue);
    }
}

?>