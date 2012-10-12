<?php
function array_to_object($array = array()) {
  if (!empty($array)) {
    $data = false;
    foreach ($array as $akey => $aval) {
      if (is_array($aval)) {
        $data->{$akey} = array_to_object($aval);
      }
      else {
        $data->{$akey} = $aval;
      }
    }
    return $data;
  }
  return false;
}
?>
