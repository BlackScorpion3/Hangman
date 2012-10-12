<?php
loadFiles('functions');
loadFiles('class');
if (!isset($_SESSION)) {
  session_start();
}

function loadFiles($dir) {
    $d = dir($dir);
    while (false !== ($entry = $d->read())) {
      if (!in_array($entry, array('.', '..'))) {
        require_once($dir.'/'.$entry);
      }
    }
    $d->close();
}
?>
