<?
    $SERVER='localhost';
    $NAME='eunhyang1223';
    $PW='Dodam0602!EMO';
    $DB='eunhyang1223';
    $CONN = mysqli_connect($SERVER,$NAME,$PW,$DB);

    $USER_ID=$_POST['userId'];
    $USER_PW= password_hash($_POST['userPw'], PASSWORD_DEFAULT);
    $USER_NAME=$_POST['userName'];
    $USER_EMAIL=$_POST['userEmail'];
    $USER_NUMBER=$_POST['userNumber'];
    $USER_ADR=$_POST['userAdr'];
    $USER_DOB=$_POST['userDob'];
    $USER_GENDER=$_POST['userGender'];
    $USER_TERMAGREE=$_POST['userTermAgree'];
    
    $INSERT = "INSERT INTO signup_table (`ID`, `PW`, `NAME`, `EMAIL`, `NUMBER`, `ADR`, `DOB`, `GENDER`, `TERMAGREE`) VALUES ('$USER_ID','$USER_PW','$USER_NAME','$USER_EMAIL','$USER_NUMBER','$USER_ADR','$USER_DOB','$USER_GENDER','$USER_TERMAGREE')";    
    
    $res=mysqli_query($CONN, $INSERT);

    if ($res) {
       echo 1;
    }
    else{
        echo 0;
    }
    
?>