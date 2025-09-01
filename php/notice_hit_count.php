<?php
  include_once('./header.php');

  $wIDX=$_POST['idx'];

  $SQL = "UPDATE `notice_table`
            SET `wHit`=`wHit`+1
            WHERE `IDX`='$wIDX'";
  $RES = mysqli_query($CONN,$SQL);
  if($RES){ echo 1;}
  else    {echo 0;};
?>