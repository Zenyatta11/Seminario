<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$section = $_GET['section'] ?? '';
$subsection = $_GET['subsection'] ?? '';
$action = $_GET['action'] ?? '';

include("../private/index.php");

switch($section) {
    case 'debug': require_once("./Sources/debug.php"); die();
    default: require_once("./Sources/index.php");
}
?>
