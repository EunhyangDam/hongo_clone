<?php
    include_once('./header.php');

    $USER_ID = $_POST['userID'];
    $USER_PW = $_POST['userPW'];

    $SQL = "SELECT ID, PW, NAME FROM `signup_table` WHERE ID='$USER_ID'";
    $RES = mysqli_query($CONN, $SQL);

    if(mysqli_num_rows($RES)>=1) {
      $item = mysqli_fetch_array($RES);
      if(password_verify($USER_PW,$item['PW'])) {
        $arr = [
            'ID'=>$item['ID'],
            'NAME'=>$item['NAME']
        ];
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
      } else{
        echo 1;
      }        
    } else{
        echo 0;
    };
?>