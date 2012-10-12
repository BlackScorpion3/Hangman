<?php
function isTrue($value) {
   if ($value && strtolower($value) !== "false") {
      return true;
   } else {
      return false;
   }
}
?>
