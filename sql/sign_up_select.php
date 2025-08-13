<?php
    include_once('./header.php');

    $USER_ID = $_POST['userID'];

    $SQL = "SELECT * FROM `signup_table` WHERE ID='$USER_ID'";
    $RES = mysqli_query($CONN, $SQL);

    if(mysqli_num_rows($RES)>=1) {
      $item = mysqli_fetch_array($RES);      
      $arr = [
          'ID'=>$item['ID'],
          'password'=>$item['PW'],
          'name'=>$item['NAME'],
          'number'=>$item['NUMBER'],
          'adress'=>$item['ADR'],
          'dob'=>$item['DOB'],
          'gender'=>$item['GENDER'],
          'email'=>$item['EMAIL']
      ];
      echo json_encode($arr,JSON_UNESCAPED_UNICODE);       
    } else{
        echo 0;
    };
?>