<?php
  include_once('./header.php');

  $SQL = "CREATE TABLE `delivery_table`(
    `IDX`          INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '식별번호',
    `userID`       VARCHAR(16) NOT NULL COMMENT '아이디 참조키',
    `dName`       VARCHAR(50) NOT NULL COMMENT '이름',
    `dHP`          VARCHAR(13) NOT NULL COMMENT '받는 사람 핸드폰 번호',
    `dDefaultADR`  TINYINT(1) DEFAULT '0' COMMENT '기본 배송지',
    `dRequst`      VARCHAR(100) COMMENT '배송 요청 사항',
    `dPostNumber`  VARCHAR(5) NOT NULL COMMENT '배송 우편번호',
    `dPostADR1`    VARCHAR(100) NOT NULL COMMENT '배송 주소1',
    `dPostADR2`    VARCHAR(100) NOT NULL COMMENT '배송 주소2',
    `dDate`        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    `dUpdate`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    `dDel`         TINYINT(1) DEFAULT '0' COMMENT '삭제',

    FOREIGN KEY(userID) REFERENCES `signup_table`(ID)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='배송지 테이블'";

  $RES =mysqli_query($CONN, $SQL);

  if($RES) echo 'Create Success';
  else echo 'Create Failed';
?>