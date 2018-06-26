import React from 'react';
import auth from 'utils/auth';
import threadDetails from 'utils/api/thread-details';

export default class Header extends React.Component {
  state = {
    profileImage: 'http://placehold.it/35x35'
  }

  async componentDidMount() {
    const { user } = this.props;
    const profileImage = await threadDetails.fetchOwnerImage(user);

    this.setState({ profileImage });
  }

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

  searchQuery() {
    const isSearchPage =  location.pathname === '/search';
    const query = location.search;

    return isSearchPage ? query.replace(/&.+/g, '').split(/\?q=/)[1] : '';
  }

  searchBar() {
    return (
      <form className="search-container" action="/search">
        <input type="search"
          placeholder="Search Nairaland"
          name="q"
          defaultValue={this.searchQuery()}
        />
        <i className="fa fa-search"></i>
        <button type="submit">Submit</button>
      </form>
    );
  }

  authLinks() {
    const { document, user: currentUser } = this.props;
    const { profileImage } = this.state;
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
    if (auth.userSignedIn(this.props.user)) {
      return this.authLinks();
    } else {
      return this.guestLinks();
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

            {  this.navlinks() }
          </nav>
        </div>

        { this.welcomeSection() }
      </header>
    );
  }
}
