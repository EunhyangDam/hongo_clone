<?php
    include_once('./header.php');

    $USER_EMAIL=$_POST['user_email'];

    $SQL = "SELECT EMAIL FROM `signup_table` WHERE EMAIL='$USER_EMAIL'";
    
    $RES = mysqli_query($CONN,$SQL);

    if(mysqli_num_rows($RES)>=1) echo 1;
    else echo 0;
?>