<?php

declare(strict_types=1);

namespace System\Core\Domain\Util;

use \Exception;
use System\Core\Domain\DTO\ResponseDTO;
use Throwable;

class HttpException extends Exception {

	public function __construct(
		string $message, 
		private int $statusCode = HttpStatusCode::SERVER_ERROR,
		int $code = 0, 
		Throwable $previous = null
	) {
        parent::__construct($message, $code, $previous);
        
		if(!$this->isCaughtException()) {
			$response = new ResponseDTO($this->message, $this->statusCode);
        	die($response->jsonify());
		}
    }

	private function isCaughtException() {
        $handler = set_exception_handler(
			function ($exception) {
            	return true;
        	}
		);
        
        restore_exception_handler();
        
        return $handler !== null;
    }
}
?>
