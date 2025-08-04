<?php
    $SERVER='localhost';
    $NAME='eunhyang1223';
    $PW='Dodam0602!EMO';
    $DB='eunhyang1223';
    $conn = mysqli_connect($SERVER,$NAME,$PW,$DB);
    if($conn){
        echo '<h1>connect!</h1>';
    }

    $user_email1 = 'eunhyanglee@gmail.com';
    $user_email2 = 'dodam@gmail.com';
    $user_email3 = 'neulchan@gmail.com';
    $user_email4 = 'sarang@gmail.com';
    $user_email5 = 'coco@gmail.com';
    $user_email6 = 'mochi@gmail.com';
    $insert_sql = "INSERT INTO email_list_table(email) VALUES
                                                        ('$user_email1'),
                                                        ('$user_email2'),
                                                        ('$user_email3'),
                                                        ('$user_email4'),
                                                        ('$user_email5'),
                                                        ('$user_email6')
    ";
    mysqli_query($conn,$insert_sql)
?>