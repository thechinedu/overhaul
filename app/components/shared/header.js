import React from 'react';
import auth from 'utils/auth';
import threadDetails from 'utils/api/thread-details';
import searchQuery from 'utils/search-query';

import withProfileImage from 'utils/hoc/with-profile-image';

@withProfileImage
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
      );
    }
  }

  searchBar() {
    return (
      <form className="search-container" action="/search">
        <input type="search"
          placeholder="Search Nairaland"
          name="q"
          defaultValue={searchQuery()}
        />
        <i className="fa fa-search"></i>
        <button type="submit">Submit</button>
      </form>
    );
  }

  authLinks() {
    const { document, currentUser, profileImage } = this.props;
    const sessionId = auth.getSessionId(document);

    return (
      <span className="navlinks-container auth-active">
        { this.searchBar() }
        <a href={`/${currentUser}`}>
          <img src={profileImage} alt="" className="profile-image" />
          <span>{currentUser}</span>
        </a>
        <a href={`/do_logout?session=${sessionId}`}>
          Logout
        </a>
        <a href={`/do_logout?session=${sessionId}&logoutall=1`} className="logoutall">
          (all)
        </a>
      </span>
    );
  }

  guestLinks() {
    return (
      <span className="navlinks-container">
        { this.searchBar() }
        <a href="/confirm_email" className="btn">
          <i className="fa fa-plus"></i>
          Join Nairaland
        </a>
        <a href="/login" className="btn">
          <i className="fa fa-sign-in"></i>
          Login
        </a>
      </span>
    );
  }

  navlinks() {
    const { currentUser } = this.props;

    if (auth.userSignedIn(currentUser)) {
      return this.authLinks();
    } else {
      return this.guestLinks();
    }
  }

  render () {
    return (
      <header className="main-header">
        <div className="navigation-wrapper">
          <nav className="navbar">
            <a href="/" className="logo">
              &#8358;airaland
            </a>
            <a href="/trending">
              <i className="fa fa-line-chart"></i>
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

            {  this.navlinks() }
          </nav>
        </div>

        { this.welcomeSection() }
      </header>
    );
  }
}
