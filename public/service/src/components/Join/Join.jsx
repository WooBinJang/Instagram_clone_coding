import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './css/index.css';
function Join() {
  const nicknames = useSelector((state) => state.config.service.nicknames);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [nickname, setNickname] = useState(undefined);
  const [isNicknameExit, setisNicknameExit] = useState(false);
  const history = useHistory();

  const createUser = useCallback(() => {
    if (email && nickname && !isNicknameExit && password && password.length >= 8) {
      let url = '/user/new';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
          email,
          nickname,
          password
        })
      })
        .then((res) => res.json())
        .then(({ msg }) => {
          console.log(msg);
          history.push('/');
        })
        .catch((err) => {
          alert('입력조건에 부합하지 않습니다.');
        });
    } else {
      alert('입력조건에 부합하지 않습니다.');
    }
  }, [email, password, nickname, isNicknameExit, history]);

  useEffect(() => {
    if (nicknames.indexOf(nickname) !== -1) {
      console.log('닉네임이 존재합니다.');
      setisNicknameExit(true);
    } else {
      console.log('닉네임이 존재하지 않습니다.');
      setisNicknameExit(false);
    }
    return () => {};
  }, [nickname, nicknames]);
  return (
    <div className="join">
      <div className="wrapper">
        <h1 className="logo">instagram</h1>

        <form
          className="join-contents"
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <div className="email-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">이메일</div>
              <div className="warning"></div>
            </div>
            <div className="inp">
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                onBlur={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="password-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">비밀번호</div>
              <div className="warning">
                {password && password.length < 8 && '비밀번호는 8자리 이상지정'}
              </div>
            </div>
            <div className="inp">
              <input
                type="password"
                placeholder="비밀번호를 8이상으로 지정하세요"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="nickname-inp custom-inp">
            <div className="top">
              <div className="title txt-bold">닉네임</div>
              <div className="warning">
                {isNicknameExit ? '이미사용하고 있는 닉네임입니다.' : ''}
              </div>
            </div>
            <div className="inp">
              <input
                type="text"
                placeholder="닉네임을 입력하세요"
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <button type="submit" className="join-btn">
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;
