import React from "react";
import "../scss/sub.scss";
import "./scss/Sub10SignUpForm.scss";
export default function Sub10SignUpForm(props) {
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
              />
              <p>사용 불가능한 아이디입니다.</p>
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
              />
              <p>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
            </div>
          </div>
          <div className="row row3">
            <label htmlFor="userPwConfirm" className="col col1">
              Confirm Password<span className="rq">*</span>
            </label>
            <div className="col col2">
              <input type="password" name="userPwConfirm" id="userPwConfirm" />
              <p>동일한 비밀번호를 입력</p>
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
              />
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
                />
                @
                <select name="at" id="at">
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
              <p>이메일 형식으로 입력해 주세요.</p>
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
                  />
                  <p>휴대폰 번호를 입력해 주세요.</p>
                </div>
                <button disabled>verification code</button>
              </div>
              <div className="dodam two">
                <div className="col col2">
                  <input type="tel" name="userTel" id="userTel" />
                </div>
                <button disabled>check verification code</button>
              </div>
            </div>
          </div>
          <div className="row row7">
            <p>
              Address<span className="rq">*</span>
            </p>
            <div className="adr active">
              <div className="col col2">
                <button type="button">
                  <i className="bi bi-search"></i> Searching Adress
                </button>
              </div>
            </div>
            <div className="adr">
              <div className="col col2">
                <input type="text" name="" id="" />
                <input type="text" name="" id="" />
              </div>
              <button>
                <i className="bi bi-search"></i> re-search
              </button>
            </div>
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
                />
                <label htmlFor="userGenderMale">Male</label>
              </div>
              <div className="female">
                <input
                  type="radio"
                  name="userGender"
                  id="userGenderFemale"
                  value="female"
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
                  aria-checked
                />
                <label htmlFor="userGenderNonbinary">Nonbinary</label>
              </div>
            </div>
          </div>
          <div className="row row9">
            <label htmlFor="">DOB</label>
            <div className="col col2 birth">
              <input
                type="number"
                name="userYear"
                id="userYear"
                placeholder="YYYY"
                maxLength="4"
              />
              <i>/</i>
              <input
                type="number"
                name="userMonth"
                id="userMonth"
                placeholder="MM"
                maxLength="2"
              />
              <i>/</i>
              <input
                type="number"
                name="userDay"
                id="userDay"
                placeholder="DD"
                maxLength="2"
              />
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
