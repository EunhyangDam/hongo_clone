<?
// http://eunhyanglee.dothome.co.kr/hongo_sign_up/create_notice_table.php
  include_once('./header.php');

  $SQL = "CREATE TABLE `notice_table`(
    `IDX`   INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '식별번호',
    `wType` VARCHAR(10) NOT NULL COMMENT '카테고리',
    `wSubject` VARCHAR(250) NOT NULL COMMENT '제목',
    `wContent` TEXT NOT NULL COMMENT '내용',
    `wID` varchar(16) NOT NULL COMMENT '아이디',
    `wDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    `wUpdate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    `wDel` TINYINT(1) DEFAULT 0 COMMENT '삭제 여부',
    `wHit` INT UNSIGNED DEFAULT 1 COMMENT '조회수'
  ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='게시판 공지사항'";

 $RES = mysqli_query($CONN,$SQL);

 if ($res) echo 'notice_table create success';
 else echo 'notice_table create Failed';
?>