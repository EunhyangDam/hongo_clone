import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub10SignUpUpdate.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../store/confirmModal";
import { postOpenAction } from "../../../../store/reactDaumPostcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../custom/InputComponent";
export default function Sub10SignUpUpdate(props) {
  const userTelRef = React.useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postcodeAsset = useSelector((state) => state.reactDaumPostcode);
  const userAsset = useSelector((state) => state.signIn.ID);
  const returnYes = useSelector((state) => state.confirmModal.isOn);

  const [id, setId] = useState(0);
  const [state, setState] = useState({
    id: "",
    pw: "",
    name: "",
    email: "",
    emailAdr: "",
    emailDuplicate: true,
    number: "",
    numberError: "",
    verificationDisable: true,
    verificationNum: null,
    isVerification: true,
    btnTxt: "verification code",
    chkCode: true,
    verificationCheck: null,
    adr1: "",
    adr2: "",
    zonecode: "",
    btnOn: false,
    gender: "nonbinary",
    year: "",
    month: "",
    day: "",
    dobError: "",
  });
  const [cnt, setCnt] = useState({
    seconds: 0,
    minutes: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      adr1: `${postcodeAsset.adr} (${postcodeAsset.buildingName})`,
      adr2: postcodeAsset.adr2,
      zonecode: postcodeAsset.zoneCode,
      btnOn: postcodeAsset.isOn,
    });
  }, [postcodeAsset]);

  const changeName = (e) => {
    let name = e.target.value.replace(/[^a-zA-Z가-힣]/g, "");
    let errorMsg = "";
    setState({
      ...state,
      name: name,
      nameErorr: errorMsg,
    });
  };
  const emailDuplicateCheck = (email) => {
    let obj = {
      messege: "",
      isOn: true,
      isConfirm: false,
    };

    if (email === "") {
      obj = { ...obj, messege: "이메일을 입력해주세요." };
      dispatch(modalAction(obj));
      return;
    }
    const formData = new FormData();
    formData.append("user_email", `${email}@gmail.com`);
    formData.append("user_ID", state.id);
    axios({
      url: "/hongo_sign_up/email_duplicate_check.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === 1) {
            obj = { ...obj, messege: "사용 중인 이메일입니다." };
            setState({
              ...state,
              emailDuplicate: false,
            });
          } else if (res.data === 0) {
            obj = { ...obj, messege: "사용 가능한 이메일입니다." };
            setState({
              ...state,
              emailDuplicate: true,
            });
          }
          dispatch(modalAction(obj));
        }
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
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
  const blurEmail = (e) => {
    emailDuplicateCheck(e.target.value);
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
        isVerification: true,
      });
      ////////////////////////////////////////////////////////////////////////////
      clearInterval(id); // 셋인터발 메모리 할당 상태 변수 값 타이머 정지
      ////////////////////////////////////////////////////////////////////////////
    } else {
      obj = {
        messege: "인증번호가 일치하지 않습니다. 다시 시도해주세요. ",
        isOn: true,
        isConfirm: false,
      };
    }
    dispatch(modalAction(obj));
  };
  const clickReSearch = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(true));
  };
  const changeAdr2 = (e) => {
    setState({
      ...state,
      adr2: e.target.value,
    });
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
          // clearInterval(setId);  => 아래쪽에 배치 하는게 좋을 듯 가독성이
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
          /////////////////////////////////////////////////////////////////////////////////
          clearInterval(id); // 4. 유효시간 만료시 타이머 timer 외부 상태 변수 사용 가능
          // clearInterval(id2);   // 4. 유효시간 만료시 타이머 timer 내부 변수 사용 거능
          // return;
          /////////////////////////////////////////////////////////////////////////////////
        }
        setCnt({
          ...cnt,
          seconds: second,
          minutes: minutes,
        });
      };

      ////////////////////////////////////////////////////////////////////////////////
      const id2 = setInterval(timer, 1000); // 1. 셋인터발 메모리저장 할당 값 정수
      /////////////////////////////////////////////////////////////////////////////////
      setId(id2); // =>  2. 셋인터발 메모리저장 할당 값 다른 위치에서 종료가 필요할 때 사용
      /////////////////////////////////////////////////////////////////////////////////
      return () => clearInterval(id2); // 3. 버블링 발생 막기 위해 리터문 필요
      /////////////////////////////////////////////////////////////////////////////////
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
      switch (true) {
        case state.year.length < 4:
          errorMsg = "태어난 연도 네 자리를 정확하게 입력해주세요.";
          break;
        case parseInt(state.year) > new Date().getFullYear():
          errorMsg = "생년월일이 미래로 설정되었습니다.";
          break;
        case parseInt(state.year) >= new Date().getFullYear() - 14:
          errorMsg = "만 14세 미만은 가입이 불가합니다.";
          break;
        case parseInt(state.year) < new Date().getFullYear() - 100:
          errorMsg = "생년월일을 다시 확인해주세요.";
          break;
        case parseInt(state.month) < 1 || parseInt(state.month) > 12:
          errorMsg = "태어난 월을 정확하게 입력해주세요.";
          break;
        case parseInt(state.day) < 1 ||
          parseInt(state.day) >
            new Date(parseInt(state.year), parseInt(state.month), 0).getDate():
          errorMsg = "태어난 일을 정확하게 입력해주세요.";
          break;
        default:
          errorMsg = "";
          break;
      }
    }
    setState({
      ...state,
      dobError: errorMsg,
    });
  }, [state.year, state.month, state.day]);
  const chnageDob = (e) => {
    let dob = e.target.value.replace(/[^0-9]/g, "");
    setState({
      ...state,
      [e.target.dataset.key]: dob,
    });
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("userID", userAsset);
    axios({
      url: "/hongo_sign_up/sign_up_select.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        setState({
          ...state,
          id: res.data.ID,
          pw: res.data.password,
          name: res.data.name,
          email: res.data.email,
          number: res.data.number,
          zonecode: res.data && res.data.adress.split("/")[0],
          adr1: res.data && res.data.adress.split("/")[1],
          adr2: res.data && res.data.adress.split("/")[2],
          gender: res.data.gender,
          year: res.data && res.data.dob.split("-")[0],
          month: res.data && res.data.dob.split("-")[1],
          day: res.data && res.data.dob.split("-")[2],
        });
      })
      .catch();
  }, [userAsset]);

  const submitSignup = (e) => {
    e.preventDefault();

    const {
      id,
      idDuplicate,
      pw,
      pwConfirm,
      name,
      email,
      emailAdr,
      emailDuplicate,
      number,
      isVerification,
      zonecode,
      adr1,
      adr2,
      year,
      month,
      day,
      termAgree,
      isAgree,
    } = state;

    const switchData = [
      { condition: id === "", messege: "아이디를 입력하세요." },
      { condition: pw === "", messege: "비밀번호를 입력하세요." },
      { condition: name === "", messege: "이름을 입력하세요." },
      { condition: email === "", messege: "이메일을 입력하세요." },
      { condition: number === "", messege: "번호를 입력하세요." },
      { condition: !isVerification, messege: "인증되지 않은 번호입니다." },
      {
        condition: adr2 === "" || adr1 === "",
        messege: "주소를 모두 입력해주세요.",
      },
      {
        condition: year === "" || month === "" || day === "",
        messege: "생년월일을 입력해주세요.",
      },
    ];
    for (const { condition, messege } of switchData) {
      if (condition) {
        dispatch(
          modalAction({
            messege: messege,
            isOn: true,
            isConfirm: false,
          })
        );
        return;
      }
    }
    const formData = new FormData();

    const appendData = [
      { field: "userId", dataKey: id },
      { field: "userName", dataKey: name },
      { field: "userEmail", dataKey: email },
      {
        field: "userNumber",
        dataKey: number.replace(/^(\d{3})(\d{3,4})(\d{3})$/g, "$1-$2-$3"),
      },
      { field: "userAdr", dataKey: `${zonecode}/${adr1}/${adr2}` },
      { field: "userDob", dataKey: `${year}-${month}-${day}` },
      { field: "userGender", dataKey: state.gender },
    ];
    appendData.forEach(({ field, dataKey }) => {
      formData.append(field, dataKey);
    });
    axios({
      url: "/hongo_sign_up/sign_in_edit.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          let obj = {
            messege: "",
            isOn: true,
            isConfirm: false,
          };
          if (res.data === 1) {
            obj = {
              ...obj,
              messege: "회원 정보가 수정되었습니다.",
            };
            dispatch(modalAction(obj));
          } else if (res.data === 0) {
            obj = {
              ...obj,
              messege: "정보 수정 실패.",
            };
            dispatch(modalAction(obj));
          }
        }
      })
      .catch((error) => {
        alert("전송 실패");
        console.log(error);
      });
  };

  return (
    <main id="sub10SignUpUpdate">
      <div className="container">
        <div className="title">
          <h2>정보 수정</h2>
          <p className="required">
            <span>*</span>required fields
          </p>
        </div>
        <form onSubmit={submitSignup} autoComplete="off">
          <div className="form">
            <div className="row row1">
              <label htmlFor="userId" className="col col1">
                ID<span className="rq">*</span>
              </label>
              <div className="col col2">
                <InputComponent
                  type="text"
                  name="userId"
                  id="userId"
                  placeholder="enter ID"
                  maxLength="16"
                  value={state.id}
                  disable={true}
                />
                <p>{state.idError}</p>
              </div>
            </div>
            <div className="row row2">
              <label htmlFor="userPw" className="col col1">
                Password<span className="rq">*</span>
              </label>
              <div className="col col2">
                <InputComponent
                  type="password"
                  name="userPw"
                  id="userPw"
                  placeholder="enter Password"
                  disable={true}
                  value={state.pw}
                />
                <p>{state.pwError}</p>
              </div>
            </div>
            <div className="row row4">
              <label htmlFor="userName" className="col col1">
                Name<span className="rq">*</span>
              </label>
              <div className="col col2">
                <InputComponent
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
                  <InputComponent
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    placeholder="e.g: eunhyang"
                    value={state.email}
                    onChange={changeEmail}
                    onBlur={blurEmail}
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
                    <InputComponent
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
                      <InputComponent
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
            <div className="row row7 useButton">
              <p>
                Address<span className="rq">*</span>
              </p>
              <div className="adr active">
                <div className="col col2">
                  <InputComponent
                    type="text"
                    name="adr1"
                    id="adr1"
                    value={state.adr1}
                    readOnly={true}
                  />
                  <InputComponent
                    type="text"
                    name="adr2"
                    id="adr2"
                    placeholder="enter detail Address"
                    value={state.adr2}
                    onChange={changeAdr2}
                  />
                </div>
                <button onClick={clickReSearch}>
                  <i className="bi bi-search"></i> re-search
                </button>
              </div>
            </div>
            <div className="row row7">
              <p>
                Zonecode<span className="rq">*</span>
              </p>
              <div className="adr active">
                <div className="col col2">
                  <InputComponent
                    type="text"
                    name="zonecode"
                    id="zonecode"
                    value={state.zonecode}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className="row row8">
              <p>Gender</p>
              <div className="col col2 gender">
                <div className="male">
                  <InputComponent
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
                  <InputComponent
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
                  <InputComponent
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
                  <InputComponent
                    type="number"
                    name="userYear"
                    id="userYear"
                    placeholder="YYYY"
                    maxLength="4"
                    dataKey="year"
                    value={state.year}
                    onChange={chnageDob}
                  />
                  <i>/</i>
                  <InputComponent
                    type="number"
                    name="userMonth"
                    id="userMonth"
                    placeholder="MM"
                    maxLength="2"
                    dataKey="month"
                    value={state.month}
                    onChange={chnageDob}
                  />
                  <i>/</i>
                  <InputComponent
                    type="number"
                    name="userDay"
                    id="userDay"
                    placeholder="DD"
                    maxLength="2"
                    dataKey="day"
                    value={state.day}
                    onChange={chnageDob}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="submit">
            <button type="submit">EDIT</button>
          </div>
        </form>
      </div>
    </main>
  );
}
