<?    
$SERVER='localhost';
$NAME='eunhyang1223';
$PW='Dodam0602!EMO';
$DB='eunhyang1223';
$CONN = mysqli_connect($SERVER,$NAME,$PW,$DB);

$USER_ID='eunhyang1223';
$USER_PW= password_hash('Dodam0602!', PASSWORD_DEFAULT);
$USER_NAME='이은향';
$USER_EMAIL='ims5023';
$USER_NUMBER='01033718786';
$USER_ADR='대한민국 서울특별시 구로구 부일로 49길 (두암빌라, 온수동) 다동 201호';
$USER_DOB='2001.01.17';
$USER_GENDER='nonbinary';
$USER_TERMAGREE='이용약관 동의 (필수),개인정보 수집∙이용 동의 (필수),마케팅 광고 활용을 위한 수집 및 이용 동의 (선택),SMS,이메일,무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택),본인은 만 14세 이상입니다. (필수)';

$INSERT = "INSERT INTO signup_table (`ID`, `PW`, `NAME`, `EMAIL`, `NUMBER`, `ADR`, `DOB`, `GENDER`, `TERMAGREE`) VALUES ('$USER_ID','$USER_PW','$USER_NAME','$USER_EMAIL','$USER_NUMBER','$USER_ADR','$USER_DOB','$USER_GENDER','$USER_TERMAGREE')";

$res=mysqli_query($CONN, $INSERT);

if ($res) {
   echo $USER_ID." 저장!";
}
else{
    echo "실패!";
}
echo "<br/>".$USER_ID."<br/>";
echo $USER_NAME."<br/>";
echo $USER_EMAIL."<br/>";
echo $USER_NUMBER."<br/>";
echo $USER_ADR."<br/>";
echo $USER_DOB."<br/>";
echo $USER_GENDER."<br/>";
echo $USER_TERMAGREE."<br/>";    
?>