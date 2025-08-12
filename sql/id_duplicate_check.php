<?php 
    include_once('./header.php');

    $USER_ID = $_POST['userId'];

    $SQL = "SELECT ID FROM `signup_table` WHERE ID='$USER_ID'";
    $RES = mysqli_query($CONN,$SQL);

    if(mysqli_num_rows($RES)>=1){echo 1;}
    else {echo 0;};
?>