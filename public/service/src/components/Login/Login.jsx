import React, { useCallback, useEffect, useState } from 'react';
import './css/index.css';
import firebaseApp from '@config/firebaseApp';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { _UPDATE_HEADER_STATE } from '@dispatchers/layouts';

const Fauth = firebaseApp.auth();
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [nickname, setNickname] = useState(undefined);

  const doLogin = (e) => {
    e.preventDefault();
    Fauth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        const { user } = credential;

        dispatch({
          type: _UPDATE_HEADER_STATE,
          payload: true
        });

        history.push('/feed');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const goJoin = useCallback(() => {
    history.push('/join');
  }, [history, email, dispatch, password]);

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="logo">instagram</h1>
        <form className="login-contents" onSubmit={doLogin}>
          <div className="email-inp commmon-inp">
            <div className="title txt-bold">이메일</div>
            <div className="inp">
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                required
                onBlur={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          {/* email-inp */}
          <div className="password-inp commmon-inp">
            <div className="title txt-bold">패스워드</div>
            <div className="inp">
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
                onBlur={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          {/* password-inp */}
          <button className="login-btn">로그인</button>
        </form>
        <div className="go-join">
          <div className="title txt-bold">회원가입하기</div>
          <div className="asset">
            <img src="/assets/welcome/arrow.svg" alt="회원가입하기" onClick={goJoin} />
          </div>
        </div>
      </div>
      {/* wrapper */}
    </div>
  );
};

export default Login;
