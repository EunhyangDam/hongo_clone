<?php
  include_once('./header.php');

 $user_email = $_POST['userEmail'];
 $INSERT = "INSERT INTO email_list_table(email) VALUES ('$user_email')";

 $res=mysqli_query($conn, $INSERT);
 
 if ($res) {
    $JSON_DATA = array("이메일"=>$user_email);
   echo json_encode($JSON_DATA, JSON_UNESCAPED_UNICODE);
 }
?>