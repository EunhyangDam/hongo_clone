<?
    include_once('./header.php');

    $TYPE=$_POST['type'];
    $ID=$_POST['id'];
    $SUBJECT=str_replace("'","\'",$_POST['subject']);
    $CONTENT=str_replace("'","\'",$_POST['content']);
    
    $INSERT = "INSERT INTO
               notice_table (`wType`, `wSubject`, `wContent`, `wID`)
               VALUES ('$TYPE','$SUBJECT','$CONTENT','$ID')";
    
    $res=mysqli_query($CONN, $INSERT);

    if ($res) {
       echo 1;
    }
    else{
        echo 0;
    }
    
?>