import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub10SignUpForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../store/confirmModal";
import {
  postAction,
  postOpenAction,
} from "../../../../store/reactDaumPostcode";
export default function Sub10SignUpForm(props) {
  const userTelRef = React.useRef();
  const dispatch = useDispatch();
  const postcodeAsset = useSelector((state) => state.reactDaumPostcode);
  const [state, setState] = useState({
    id: "",
    idError: "",
    pw: "",
    pwError: "",
    pwConfirm: "",
    pwConfirmError: "",
    name: "",
    nameErorr: "",
    email: "",
    emailAdr: "",
    emailError: "",
    number: "",
    numberError: "",
    verificationDisable: true,
    verificationNum: null,
    btnTxt: "verification code",
    chkCode: true,
    verificationCheck: null,
    adr1: "",
    adr2: "",
    btnOn: false,
    gender: "nonbinary",
    year: "",
    month: "",
    day: "",
    dobError: "",
  });
  useEffect(() => {
    setState({
      ...state,
      adr1: `${postcodeAsset.adr} (${postcodeAsset.buildingName})`,
      adr2: postcodeAsset.adr2,
      btnOn: postcodeAsset.isOn,
    });
  }, [postcodeAsset]);
  const [cnt, setCnt] = useState({
    seconds: 0,
    minutes: 0,
  });
  const onChangeId = (e) => {
    const regEx1 = /^(.){6,}$/g;
    const regEx2 = /[a-z]+[a-z0-9]*/gi;
    let id = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    let errorMsg = "";
    if (!regEx1.test(id) || !regEx2.test(id)) {
      errorMsg = "6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합";
    } else {
      errorMsg = "";
    }
    setState({
      ...state,
      id: id,
      idError: errorMsg,
    });
  };
  const changePw = (e) => {
    const regEx =
      /^(?=.*[a-zA-Z])(?=.*[\d\W])(?!.*(.)\1\1)[a-zA-Z\d!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]{10,}$/;

    let pw = e.target.value;
    let errorMsg = "";

    if (pw.length < 10) {
      errorMsg = "10자 이상 입력해주세요";
    } else if (!regEx.test(pw)) {
      errorMsg =
        "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합. 동일 문자 3회 이상 반복 불가";
    } else {
      errorMsg = "";
    }

    setState({
      ...state,
      pw: pw,
      pwError: errorMsg,
    });
  };
  const changeConfirm = (e) => {
    const pwConfirm = e.target.value;
    let errorMsg = "";

    if (state.pw !== pwConfirm) {
      errorMsg = "비밀번호가 일치하지 않습니다";
    }

    setState({
      ...state,
      pwConfirm: pwConfirm,
      pwConfirmError: errorMsg,
    });
  };
  const changeName = (e) => {
    let name = e.target.value.replace(/[^a-zA-Z가-힣]/g, "");
    let errorMsg = "";
    setState({
      ...state,
      name: name,
      nameErorr: errorMsg,
    });
  };
  const changeEmail = (e) => {
    let email = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    let errorMsg = "";
    setState({
      ...state,
      email: email,
      emailError: errorMsg,
    });
  };
  const changeAdrEmail = (e) => {
    let errorMsg = "";
    let adr = e.target.value;
    setState({
      ...state,
      email: ``,
    });
  };
  const changeNumber = (e) => {
    let number = e.target.value.replace(/[^0-9]/g, "");
    let errorMsg = "";
    let verificationDisable = true;
    const regEx = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;

    if (!regEx.test(number)) {
      errorMsg = "번호 형식을 입력해주세요";
    } else {
      verificationDisable = false;
    }
    setState({
      ...state,
      number: number,
      numberError: errorMsg,
      verificationDisable: verificationDisable,
    });
  };
  const clickVerfication = (e) => {
    e.preventDefault();
    let verificationNum = null;

    if (state.btnTxt === "another number") {
      setState({
        ...state,
        number: "",
        nameErorr: "",
        verificationNum: null,
        btnTxt: "verification code",
        chkCode: true,
        verificationDisable: true,
        verificationCheck: null,
      });
      userTelRef.current.focus();
    } else {
      verificationNum = Math.floor(Math.random() * 900000 + 10000);
      const obj = {
        messege: `인증번호가 발급되었습니다. ${verificationNum}`,
        isOn: true,
        isConfirm: false,
      };
      dispatch(modalAction(obj));
      setState({
        ...state,
        verificationNum: verificationNum,
      });
    }
  };
  const changeVerification = (e) => {
    let verification = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value === "") {
      setState({
        ...state,
        chkCode: true,
      });
    }
    setState({
      ...state,
      chkCode: false,
      verificationCheck: parseInt(verification),
    });
  };
  const clickVerficationCheck = (e) => {
    e.preventDefault();
    let obj = {};
    if (state.verificationNum === state.verificationCheck) {
      obj = {
        messege: "인증번호가 확인되었습니다.",
        isOn: true,
        isConfirm: false,
      };
      setState({
        ...state,
        verificationNum: null,
        btnTxt: "another number",
      });
    } else {
      obj = {
        messege: "인증번호가 일치하지 않습니다. 다시 시도해주세요. ",
        isOn: true,
        isConfirm: false,
      };
    }
    dispatch(modalAction(obj));
  };
  const clickAdrSearch = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(true));
  };
  const clickReSearch = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(true));
  };
  useEffect(() => {
    if (state.verificationNum !== null) {
      let start = new Date();
      start.setMinutes(start.getMinutes() + 1);
      const timer = () => {
        const left = start - new Date();
        let second = Math.floor((left / 1000) % 60);
        let minutes = Math.floor((left / (1000 * 60)) % 60);
        if (new Date() > start) {
          clearInterval(setId);
          const obj = {
            messege: "유효시간이 만료되었습니다.",
            isOn: true,
            isConfirm: false,
          };
          dispatch(modalAction(obj));
          setState({
            ...state,
            verificationNum: null,
            chkCode: true,
            verificationCheck: null,
          });
          return;
        }
        setCnt({
          seconds: second,
          minutes: minutes,
        });
      };
      const setId = setInterval(timer, 1000);
    }
  }, [state.verificationNum]);

  const changeGender = (e) => {
    setState({
      ...state,
      gender: e.target.value,
    });
  };

  useEffect(() => {
    let errorMsg = "";
    if (state.year === "" && state.month === "" && state.day === "") {
      errorMsg = "";
    } else {
      if (state.year.length < 4) {
        errorMsg = "태어난 연도 네 자리를 정확하게 입력해주세요.";
      } else if (parseInt(state.year) > new Date().getFullYear()) {
        errorMsg = "생년월일이 미래로 설정되었습니다.";
      } else if (parseInt(state.year) >= new Date().getFullYear() - 14) {
        errorMsg = "만 14세 미만은 가입이 불가합니다.";
      } else if (parseInt(state.year) < new Date().getFullYear() - 100) {
        errorMsg = "생년월일을 다시 확인해주세요.";
      } else {
        if (parseInt(state.month) < 1 || parseInt(state.month) > 12) {
          errorMsg = "태어난 월을 정확하게 입력해주세요.";
        } else {
          if (
            parseInt(state.day) < 1 ||
            parseInt(state.day) >
              new Date(parseInt(state.year), parseInt(state.month), 0).getDate()
          ) {
            errorMsg = "태어난 일을 정확하게 입력해주세요.";
          }
        }
      }
    }
    setState({
      ...state,
      dobError: errorMsg,
    });
  }, [state.year, state.month, state.day]);
  const changeYear = (e) => {
    let number = e.target.value.replace(/[^0-9]/g, "");
    let errorMsg = "";
    setState({
      ...state,
      year: number,
      dobErrorMsg: errorMsg,
    });
  };
  const changeMonth = (e) => {
    let number = parseFloat(e.target.value.replace(/[^0-9]/g, ""));
    setState({
      ...state,
      month: number,
    });
  };
  const changeDay = (e) => {
    let number = parseFloat(e.target.value.replace(/[^0-9]/g, ""));
    setState({
      ...state,
      day: number,
    });
  };
  return (
    <main id="sub10SignUpForm">
      <div className="container">
        <div className="title">
          <h2>Create An Account</h2>
          <p className="required">
            <span>*</span>required fields
          </p>
        </div>
        <form action="" method="post">
          <div className="row row1 useButton">
            <label htmlFor="userId" className="col col1">
              ID<span className="rq">*</span>
            </label>
            <div className="col col2">
              <input
                type="text"
                name="userId"
                id="userId"
                placeholder="enter ID"
                onChange={onChangeId}
                maxLength="16"
                value={state.id}
              />
              <p>{state.idError}</p>
            </div>
            <button>id duplicate check</button>
          </div>
          <div className="row row2">
            <label htmlFor="userPw" className="col col1">
              Password<span className="rq">*</span>
            </label>
            <div className="col col2">
              <input
                type="password"
                name="userPw"
                id="userPw"
                placeholder="enter Password"
                onChange={changePw}
              />
              <p>{state.pwError}</p>
            </div>
          </div>
          <div className="row row3">
            <label htmlFor="userPwConfirm" className="col col1">
              Confirm Password<span className="rq">*</span>
            </label>
            <div className="col col2">
              <input
                type="password"
                name="userPwConfirm"
                id="userPwConfirm"
                onChange={changeConfirm}
                value={state.pwConfirm}
              />
              <p>{state.pwConfirmError}</p>
            </div>
          </div>
          <div className="row row4">
            <label htmlFor="userName" className="col col1">
              Name<span className="rq">*</span>
            </label>
            <div className="col col2">
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="enter full name"
                value={state.name}
                onChange={changeName}
              />
              <p>{state.nameErorr}</p>
            </div>
          </div>
          <div className="row row5">
            <label htmlFor="userEmail">
              e-mail<span className="rq">*</span>
            </label>
            <div className="col col2 email">
              <div className="box">
                <input
                  type="text"
                  name="userEmail"
                  id="userEmail"
                  placeholder="e.g: eunhyang"
                  value={state.email}
                  onChange={changeEmail}
                />
                @
                <select
                  name="at"
                  id="at"
                  onChange={changeAdrEmail}
                  placeholder="SELECT"
                >
                  <option value="">select</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="kakao.com">kakao.com</option>
                  <option value="hotmail.com">hotmail.com</option>
                  <option value="yahoo.co.kr">yahoo.co.kr</option>
                  <option value="직접 입력">직접 입력</option>
                </select>
              </div>
              <p>{state.emailError}</p>
            </div>
          </div>
          <div className="row row6 useButton">
            <label htmlFor="userTel" className="col col1">
              phone number<span className="rq">*</span>
            </label>
            <div className="right">
              <div className="dodam one">
                <div className="col col2">
                  <input
                    type="tel"
                    name="userTel"
                    id="userTel"
                    placeholder="enter only number"
                    onChange={changeNumber}
                    value={state.number}
                    ref={userTelRef}
                  />
                  <p>{state.numberError}</p>
                </div>
                <button
                  disabled={state.verificationDisable}
                  onClick={clickVerfication}
                >
                  {state.btnTxt}
                </button>
              </div>
              {state.verificationNum !== null && (
                <div className="dodam two">
                  <div className="col col2">
                    <input
                      type="tel"
                      name="userAuthor"
                      id="userAuthor"
                      onChange={changeVerification}
                      value={state.verificationCheck}
                    />
                    <div className="timer">
                      <span>{String(cnt.minutes).padStart(2, 0)}</span>
                      <i>:</i>
                      <span>{String(cnt.seconds).padStart(2, 0)}</span>
                    </div>
                  </div>
                  <button
                    disabled={state.chkCode}
                    onClick={clickVerficationCheck}
                  >
                    check verification code
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={`row row7 ${state.btnOn && "useButton"}`}>
            <p>
              Address<span className="rq">*</span>
            </p>
            {state.btnOn ? (
              <div className="adr active">
                <div className="col col2">
                  <input
                    type="text"
                    name="adr1"
                    id="adr1"
                    value={state.adr1}
                    readOnly
                  />
                  <input
                    type="text"
                    name="adr2"
                    id="adr2"
                    placeholder="enter detail Address"
                    defaultValue={state.adr2}
                  />
                </div>
                <button onClick={clickReSearch}>
                  <i className="bi bi-search"></i> re-search
                </button>
              </div>
            ) : (
              <div className="adr">
                <div className="col col2">
                  <button type="button" onClick={clickAdrSearch}>
                    <i className="bi bi-search"></i> Searching Address
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="row row8">
            <p>Gender</p>
            <div className="col col2 gender">
              <div className="male">
                <input
                  type="radio"
                  name="userGender"
                  id="userGenderMale"
                  value="male"
                  checked={state.gender === "male"}
                  onChange={changeGender}
                />
                <label htmlFor="userGenderMale">Male</label>
              </div>
              <div className="female">
                <input
                  type="radio"
                  name="userGender"
                  id="userGenderFemale"
                  value="female"
                  checked={state.gender === "female"}
                  onChange={changeGender}
                />
                <label htmlFor="userGenderFemale" className="col col1">
                  Female
                </label>
              </div>
              <div className="nonbinary">
                <input
                  type="radio"
                  name="userGender"
                  id="userGenderNonbinary"
                  value="nonbinary"
                  checked={state.gender === "nonbinary"}
                  onChange={changeGender}
                />
                <label htmlFor="userGenderNonbinary">Nonbinary</label>
              </div>
            </div>
          </div>
          <div className="row row9">
            <p>DOB</p>
            <div className="col col2 birth">
              <div className="input-box">
                <input
                  type="number"
                  name="userYear"
                  id="userYear"
                  placeholder="YYYY"
                  maxLength="4"
                  onChange={changeYear}
                />
                <i>/</i>
                <input
                  type="number"
                  name="userMonth"
                  id="userMonth"
                  placeholder="MM"
                  maxLength="2"
                  onChange={changeMonth}
                />
                <i>/</i>
                <input
                  type="number"
                  name="userDay"
                  id="userDay"
                  placeholder="DD"
                  maxLength="2"
                  onChange={changeDay}
                />
              </div>
              <p>{state.dobError}</p>
            </div>
          </div>
        </form>
        <div className="line"></div>
        <div className="terms">
          <p>
            terms<span className="rq">*</span>
          </p>
          <div className="right">
            <div className="row row1">
              <input type="checkbox" name="allChk" id="allChk" />
              <label htmlFor="allChk">
                <p className="heading">전체 동의합니다.</p>
                <p className="explain">
                  선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
                  이용할 수 있습니다.
                </p>
              </label>
            </div>
            <div className="row row2">
              <input type="checkbox" name="chk1" id="chk1" />
              <label htmlFor="chk1">
                <span>이용약관 동의</span>
                <span className="small">(필수)</span>
              </label>
            </div>
            <div className="row row3">
              <input type="checkbox" name="chk2" id="chk2" />
              <label htmlFor="chk2">
                <span>개인정보 수집∙이용 동의</span>
                <span className="small">(필수)</span>
              </label>
            </div>
            <div className="row row4">
              <div className="marketing">
                <input type="checkbox" name="chk3" id="chk3" />
                <label htmlFor="chk3">
                  <span>마케팅 광고 활용을 위한 수집 및 이용 동의</span>
                  <span className="small">(선택)</span>
                </label>
              </div>
              <div className="sms-email">
                <label>
                  <input type="checkbox" name="SMS" id="SMS" />
                  SMS
                </label>
                <label>
                  <input type="checkbox" name="termEmail" id="termEmail" />
                  이메일
                </label>
              </div>
            </div>
            <div className="row row5">
              <input type="checkbox" name="chk4" id="chk4" />
              <label htmlFor="chk4">
                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                <span className="small">(선택)</span>
              </label>
            </div>
            <div className="row row6">
              <input type="checkbox" name="chk5" id="chk5" />
              <label htmlFor="chk5">
                <span>본인은 만 14세 이상입니다.</span>
                <span className="small">(필수)</span>
              </label>
            </div>
          </div>
        </div>
        <div className="submit">
          <button type="submit">Sign Up</button>
        </div>
      </div>
    </main>
  );
}
