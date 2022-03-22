import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';

function Header() {
  return (
    <div className="header">
      <div className="wrapper">
        <h1 className="logo">instagram</h1>
        <nav className="navigation">
          <ul className="nav-wrapper">
            <li className="nav">
              <img src="/assets/header/feed-dac.svg" alt="피드로가기" />
            </li>
            <Link to="/profile">
              <li className="nav">
                <img src="/assets/header/profile-dac.svg" alt="프로필로 가이" />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
