<?php
  include_once('./header.php');

  $userId =$_POST['userId'];
  $INDEX =$_POST['INDEX'];
  $dName =$_POST['dName'];
  $dDefaultADR =$_POST['dDefaultADR'];
  $dHP =$_POST['dHP'];
  $dAdr1 =$_POST['dAdr1'];
  $dAdr2 =$_POST['dAdr2'];
  $dPostNumber =$_POST['dPostNumber'];
  $dRequst =$_POST['dRequst'];
  
  if($dDefaultADR==1){
    $SQL = "UPDATE `delivery_table`
            SET `dDefaultADR`= '0'
            WHERE `userID`='$userId'";
    mysqli_query($CONN, $SQL);
  }

  $SQL2 = "UPDATE `delivery_table`
            SET `dName`='$dName',
                `dDefaultADR`='$dDefaultADR',
                `dHP`='$dHP',
                `dPostADR1`='$dAdr1',
                `dPostADR2`='$dAdr2',
                `dPostNumber`='$dPostNumber',
                `dRequst`='$dRequst'
            WHERE `IDX`='$INDEX' AND `userID`='$userId'";

  $RES = mysqli_query($CONN,$SQL2);
  if($RES){ echo 1;}
  else    {echo 0;};
?>