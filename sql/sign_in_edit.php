<?php
  include_once('./header.php');

  $USER_ID=$_POST['userId'];
  $USER_NAME=$_POST['userName'];
  $USER_EMAIL=$_POST['userEmail'];
  $USER_NUMBER=$_POST['userNumber'];
  $USER_ADR=$_POST['userAdr'];
  $USER_DOB=$_POST['userDob'];
  $USER_GENDER=$_POST['userGender'];

  $SQL = "UPDATE `signup_table`
            SET `NAME`='$USER_NAME',
                `EMAIL`='$USER_EMAIL',
                `NUMBER`='$USER_NUMBER',
                `ADR`='$USER_ADR',
                `DOB`='$USER_DOB',
                `GENDER`='$USER_GENDER'
            WHERE `ID`='$USER_ID'";
  $RES = mysqli_query($CONN,$SQL);
  if($RES){ echo 1;}
  else    {echo 0;};
?>