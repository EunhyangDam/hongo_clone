<?
    include_once('./header.php');

    $USER_ID=$_POST['userId'];
    $USER_PW= password_hash($_POST['userPw'], PASSWORD_DEFAULT);
    $USER_NAME=$_POST['userName'];
    $USER_EMAIL=$_POST['userEmail'];
    $USER_NUMBER=$_POST['userNumber'];
    $USER_ADR=$_POST['userAdr'];
    $USER_ADR_POST=$_POST['userPost'];
    $USER_ADR1=$_POST['userAdr1'];
    $USER_ADR2=$_POST['userAdr2'];
    $USER_DOB=$_POST['userDob'];
    $USER_GENDER=$_POST['userGender'];
    $USER_TERMAGREE=$_POST['userTermAgree'];
    
    $INSERT = "INSERT INTO signup_table (`ID`, `PW`, `NAME`, `EMAIL`, `NUMBER`, `ADR`, `DOB`, `GENDER`, `TERMAGREE`) VALUES ('$USER_ID','$USER_PW','$USER_NAME','$USER_EMAIL','$USER_NUMBER','$USER_ADR','$USER_DOB','$USER_GENDER','$USER_TERMAGREE')";

    $res=mysqli_query($CONN, $INSERT);

    if($res){
       $dName = $USER_NAME;
       $dHP = $USER_NUMBER;
       $dDefaultADR = 1;
       $dRequst = '부재 시 문 앞에 놔주세요.';
       $dPostNumber =$USER_ADR_POST;
       $dPostADR1 =$USER_ADR1;
       $dPostADR2 =$USER_ADR2;

       $INSERT2 = "INSERT INTO `delivery_table`
                  (`dName`, `dHP`, `dDefaultADR`, `dRequst`, `dPostNumber`, `dPostADR1`, `dPostADR2`,`userID`)
                  VALUES
                  ('$dName','$dHP','$dDefaultADR','$dRequst','$dPostNumber','$dPostADR1','$dPostADR2','$USER_ID')";
        
        $res2=mysqli_query($CONN, $INSERT2);
    }   
    
    if ($res && $res2) {
       echo 1;
    }
    else{
        echo 0;
    }
    
?>