<?php
  include_once('./header.php');

  $userId = $_POST['userId'];
  $dName = $_POST['dName'];
  $dDefaultADR = $_POST['dDefaultADR'];
  $dHP = $_POST['dHP'];
  $dAdr1 = $_POST['dAdr1'];
  $dAdr2 = $_POST['dAdr2'];
  $dPostNumber = $_POST['dPostNumber'];
  $dRequst = $_POST['dRequst'];

  if($dDefaultADR==1){
    $SQL = "UPDATE `delivery_table`
            SET `dDefaultADR`= '0'
            WHERE `userID`='$userId'";
    mysqli_query($CONN, $SQL);
  }

  $INSERT2 = "INSERT INTO `delivery_table`
                          (`dName`, `dHP`, `dDefaultADR`, `dRequst`, `dPostNumber`, `dPostADR1`, `dPostADR2`,`userID`)
                  VALUES
                          ('$dName','$dHP','$dDefaultADR','$dRequst','$dPostNumber','$dAdr1','$dAdr2','$userId')";
  
  $res2=mysqli_query($CONN, $INSERT2);

  
  if ($res2) echo 1;
  else echo 0;

?>