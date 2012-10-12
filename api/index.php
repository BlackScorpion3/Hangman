<?php
require_once 'loader.php';
//printR($_SESSION);
//unset($_SESSION['hangman']);
$ajax = new ajax();

echo $ajax->output();
?>