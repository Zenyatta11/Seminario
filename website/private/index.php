<?php
	use System\Router;
	use System\Core\Domain\Util\HttpException;

	spl_autoload_register(
		function ($class) {
			if(file_exists(__DIR__ . '/' . str_replace('\\', '/', $class) . '.php')) 
				require_once(__DIR__ . '/' . str_replace('\\', '/', $class) . '.php');
		}
	);

	function custom_error_handler($input, $msg = '', $file = '', $line = '', $context = '') {
		if (error_reporting() == 0) return;
	
		if (is_object($input)) {
			if($input instanceof mysqli_sql_exception) die($input->getTraceAsString() . "<br>" . $input->getMessage());
			else if($input instanceof HttpException) $input->tossError();
			else die($input);
		} else {
			die("<strong>$file</strong>:$line - $msg | $context");
		}
	}
	
	set_error_handler('custom_error_handler');
	set_exception_handler('custom_error_handler');

	
	$router = new Router();
	
	$section = $_GET['section'] ?? '';
	$subsection = $_GET['subsection'] ?? '';
	$action = $_GET['action'] ?? '';

	if($section == "media") {
		header('Content-Type: image/png');
		header('Content-Disposition: inline; filename="' . $action . '.png"');
		die($router->getResponse($section, $subsection, $action)->getData());
	} else {
		header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
		header("Cache-Control: post-check=0, pre-check=0", false);
		header("Pragma: no-cache");
		header('Content-type: application/json');
		die($router->getResponse($section, $subsection, $action)->jsonify());
	}
?>
