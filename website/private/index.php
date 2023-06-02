<?php
spl_autoload_register(
	function ($class) {
		require_once(__DIR__ . '/' . str_replace('\\', '/', $class) . '.php');
	}
);

use System\Router;

$response = new Router();

header('Content-type: application/json');
die($response->jsonify());

?>