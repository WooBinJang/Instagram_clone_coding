import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/core.css';
import Header from './Header/Header';
import Join from './Join/Join';
import Login from './Login/Login';
import MainFeed from './MainFeed/MainFeed';
/* 
function fnc(state){
  return state.layouts.isHeaderOpen;
}
*/
function App() {
  // const isHeaderOpen = useSelector((state) => {
  //   state.layouts.isHeaderOpen;
  // });

  const isHeaderOpen = useSelector((state) => state.layouts.isHeaderOpen);

  // 어떤 state 값을 쓰고 싶은지 선택하는 hook
  return (
    <Router>
      {isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
      </Switch>
    </Router>
  );
}
// npm run-script build
export default App;

// redux
// npm install react-redux
// npm i -D redux-devtools
