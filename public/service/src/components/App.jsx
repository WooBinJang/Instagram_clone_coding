import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/core.css';
import Header from './Header/Header';
import Join from './Join/Join';
import Login from './Login/Login';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
      </Switch>
    </Router>
  );
}
// npm run-script build
export default App;
