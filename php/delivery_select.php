<?php
  include_once('./header.php');

  $userID = $_POST['userID'];

  $SQL = "SELECT * FROM `delivery_table`
          WHERE userID='$userID' AND dDel=0
          ORDER BY dDefaultADR DESC";
  $RES = mysqli_query($CONN, $SQL);
  $arr = array();
  
  if(mysqli_num_rows($RES)>=1) {
    while ($item = mysqli_fetch_array($RES)) {
      array_push($arr, array(        
        'IDX'=>$item['IDX'],
        'userID'=>$item['userID'],
        'dName'=>$item['dName'],
        'dHP'=>$item['dHP'],
        'dDefaultADR'=>$item['dDefaultADR'],
        'dRequst'=>$item['dRequst'],
        'dPostNumber'=>$item['dPostNumber'],
        'dPostADR1'=>$item['dPostADR1'],
        'dPostADR2'=>$item['dPostADR2'],
        'dDate'=>$item['dDate'],
        'dUpdate'=>$item['dUpdate'],
      ));
    };
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  } else{
      echo 0;
  }
?>