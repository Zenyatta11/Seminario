<?php

	header('Content-type: application/json');

	spl_autoload_register(
		function ($class) {
			require_once(__DIR__ . '/' . str_replace('\\', '/', $class) . '.php');
		}
	);

	use System\Router;
	$router = new Router();

	die($router->getResponse()->jsonify());

?>
