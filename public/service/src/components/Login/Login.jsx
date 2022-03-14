import React from 'react';
import './css/index.css';
const Login = () => {
  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="logo">instagram</h1>
        <form className="login-contents">
          <div className="email-inp commmon-inp">
            <div className="title txt-bold">이메일</div>
            <div className="inp">
              <input type="email" placeholder="이메일을 입려하세요" required />
            </div>
          </div>
          {/* email-inp */}
          <div className="password-inp commmon-inp">
            <div className="title txt-bold">패스워드</div>
            <div className="inp">
              <input type="password" placeholder="비밀번호를 입력하세요" required />
            </div>
          </div>
          {/* password-inp */}
          <button className="login-btn">로그인</button>
        </form>
        <div className="go-join">
          <div className="title txt-bold">회원가입하기</div>
          <div className="asset">
            <img src="/assets/welcome/arrow.svg" alt="회원가입하기" />
          </div>
        </div>
      </div>
      {/* wrapper */}
    </div>
  );
};

export default Login;
