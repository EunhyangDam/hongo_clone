<?php
  include_once('./header.php');

  $idx = $_POST['idx'];

//   $SQL = "DELETE FROM `notice_table`
//                  WHERE IDX='$idx'";
  $SQL = "UPDATE `notice_table`
          SET `wDel`=1
          WHERE `IDX`='$idx'";
  
  $RES = mysqli_query($CONN,$SQL);
  
  if ($RES) {
    echo 1;
} else {
    echo 0;
  };
  
?>