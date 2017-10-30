import React from 'react';
import auth from 'utils/auth';

export default class Header extends React.Component {
  welcomeSection() {
    if (location.pathname === '/' || location.pathname === '/home') {
      return (
        <div className="welcome-section">
          <div className="container">
            <h1>
              Welcome to Nigeria's biggest forum
            </h1>

            <p>
              Nairaland is a community of friendly Nigerians and friends of Nigeria
            </p>
          </div>
        </div>
      )
    }
  }

  navlinks() {
    if (auth.userSignedIn(this.props.user)) {
      console.log(true);
    } else {
      return (
        <span className="navlinks-container">
          <i className="fa fa-search"></i>
          <input type="search" placeholder="Search Nairaland" />
          <a href="/register">
            <i className="fa fa-plus"></i>
            Join Nairaland
          </a>
          <a href="/login">
            <i className="fa fa-sign-in"></i>
            Login
          </a>
        </span>
      );
    }
  }

  render () {
    return (
      <header>
        <div className="navigation-wrapper">
          <nav className="navbar">
            <a href="/" className="logo">
              &#8358;airaland
            </a>

            {  this.navlinks() }
          </nav>
        </div>

        { this.welcomeSection() }

        <div className="container">
          <a href="/trending">
            <i className="fa fa-rocket"></i>
            Trending
          </a>
          <a href="/recent">
            <i className="fa fa-clock-o"></i>
            Recent
          </a>
          <a href="/topics">
            <i className="fa fa-star-o"></i>
            New
          </a>
        </div>
      </header>
    );
  }
}