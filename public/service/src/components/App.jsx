import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/core.css';
import Header from './Header/Header';
import Join from './Join/Join';
import Login from './Login/Login';
import MainFeed from './MainFeed/MainFeed';
import firebaseApp from '@config/firebaseApp';
import { _NICKNAME_SERVICE_UPDATE_ } from '@dispatchers/config';
import { _UPDATE_SESSION } from '@dispatchers/auth';
import { _UPDATE_HEADER_STATE } from '@dispatchers/layouts';
import Profile from './Profile/Profile';

const Fdatabase = firebaseApp.database();
const Fauth = firebaseApp.auth();

function App() {
  const isHeaderOpen = useSelector((state) => state.layouts.isHeaderOpen);
  // 어떤 state 값을 쓰고 싶은지 선택하는 hook
  const dispatch = useDispatch();
  const getNickNames = useCallback(() => {
    //실시간으로 DB에서 데이터 가져오기
    var nicknameRef = Fdatabase.ref('statics/nicknames'); //var
    nicknameRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch({
          type: _NICKNAME_SERVICE_UPDATE_,
          payload: Object.values(snapshot.val()) // 데이터값을 페이로드에 넘겨준다.
        });
      } else {
        dispatch({
          type: _NICKNAME_SERVICE_UPDATE_,
          payload: [] // 데이터가 없을 경우 빈 배열을 페이로드에 넘겨준다.
        });
      }
    });
    return nicknameRef;
  }, [dispatch]);

  useEffect(() => {
    const nicknameRef = getNickNames();
    return () => {
      nicknameRef.off(); // DB에서 실시간 데이터 받기 끄기
    };
  }, [getNickNames]);

  useEffect(() => {
    Fauth.onAuthStateChanged((users) => {
      // 로그인 된 현재 사용자 리턴
      if (users) {
        const { uid, displayName, email } = users;
        dispatch({
          type: _UPDATE_HEADER_STATE,
          payload: true
        });
        dispatch({
          type: _UPDATE_SESSION,
          payload: { uid, displayName, email }
        });
      } else {
        dispatch({
          type: _UPDATE_SESSION,
          payload: undefined
        });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      {isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}
// npm run-script build
export default App;

// redux
// npm install react-redux
// npm i -D redux-devtools
