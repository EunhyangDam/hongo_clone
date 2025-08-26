<?php
  include_once('./header.php');

  $USER_ID = $_POST['userID'];
  $INDEX = $_POST['Index'];

  $SQL = "UPDATE `delivery_table`
          SET `dDel`=1
          WHERE `IDX`='$INDEX' AND `userID`='$USER_ID'";
          
  $RES = mysqli_query($CONN,$SQL);

  if($RES) echo 1; else echo 0;
?>