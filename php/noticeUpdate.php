<?php
  include_once('./header.php');

  $wIDX=$_POST['idx'];
  $wSubject=str_replace("'","\'",$_POST['subject']);
  $wContent=str_replace("'","\'",$_POST['content']);

  $SQL = "UPDATE `notice_table`
            SET `wSubject`='$wSubject',
                `wContent`='$wContent'
            WHERE `IDX`='$wIDX'";
  $RES = mysqli_query($CONN,$SQL);
  if($RES){ echo 1;}
  else    {echo 0;};
?>