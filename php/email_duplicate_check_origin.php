<?php
    include_once('./header.php');

    $USER_EMAIL=$_POST['user_email'];
    $USER_ID=$_POST['user_ID'];

    $SQL = "SELECT EMAIL,ID FROM `signup_table` WHERE EMAIL='$USER_EMAIL'";
    
    $RES = mysqli_query($CONN,$SQL);

    if(mysqli_num_rows($RES)>=1){
      $item = mysqli_fetch_array($RES);
      if($item['ID']!=$USER_ID){
        echo 1;
      }else{echo 0;};
    }
    else {echo 0;};
?>