<?php
	spl_autoload_register(
		function ($class) {
			require_once(__DIR__ . '/' . str_replace('\\', '/', $class) . '.php');
		}
	);

	use System\Router;
	$router = new Router();
	
	$section = $_GET['section'] ?? '';
	$subsection = $_GET['subsection'] ?? '';
	$action = $_GET['action'] ?? '';

	if(isset($_GET['process'])) {
		header('Content-type: application/json');
		die($router->getResponse($section, $subsection, $action)->jsonify());
	} else {
		$_CONTEXT = $router->getData($section, $subsection, $action)->getData();
		$_LANG = $router->getLanguage($_COOKIE['language'] ?? $_CONTEXT['common']['fallbackLocale']);
	}
?>