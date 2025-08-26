<?php
  include_once('./header.php');

  $userID = $_POST['userID'];
  $INDEX = $_POST['INDEX'];

  $SQL = "SELECT * FROM `delivery_table`
          WHERE userID='$userID' AND dDel=0 AND `IDX`='$INDEX'";
  $RES = mysqli_query($CONN, $SQL);
  
  if(mysqli_num_rows($RES)>=1) {
      $item = mysqli_fetch_assoc($RES);
      $arr = array(        
        'IDX'=>(int)$item['IDX'],
        'userID'=>$item['userID'],
        'dName'=>$item['dName'],
        'dHP'=>$item['dHP'],
        'dDefaultADR'=>(int)$item['dDefaultADR'],
        'dRequst'=>$item['dRequst'],
        'dPostNumber'=>$item['dPostNumber'],
        'dPostADR1'=>$item['dPostADR1'],
        'dPostADR2'=>$item['dPostADR2'],
        'dDate'=>$item['dDate'],
        'dUpdate'=>$item['dUpdate'],
      );
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  } else echo 0;
?>