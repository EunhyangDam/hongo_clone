<?php
  include_once('./header.php');

  $SQL = "SELECT * FROM `notice_table`
          WHERE wDel=0
          ";
  $RES = mysqli_query($CONN, $SQL);
  $arr = array();
  
  if(mysqli_num_rows($RES)>=1) {
    while ($item = mysqli_fetch_array($RES)) {
      array_push($arr, array(        
        'IDX'=>$item['IDX'],
        'wType'=>$item['wType'],
        'wSubject'=>$item['wSubject'],
        'wContent'=>$item['wContent'],
        'wID'=>$item['wID'],
        'wDate'=>$item['wDate'],
        'wUpdate'=>$item['wUpdate'],
        'wDel'=>$item['wDel'],
        'wHit'=>$item['wHit']
      ));
    };
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  } else{
      echo 0;
  }
?>