import React from 'react';
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';

import Header from './components/shared/header';
import Footer from './components/shared/footer';
import Home from './components/home';
import CommentThread from './components/comment-thread';
import ConfirmEmail from './components/confirm-email';
import Register from './components/register';
import SearchResults from './components/search-results';
import Trending from './components/trending';

import generateNewApplicationContainer from 'utils/generate-app-container';

const $ = cheerio.load(document.body.innerHTML);
const currentUser = $('#up .user').text();

import './styles/default/overhaul.scss';

class App extends React.Component {
  renderRequiredComponent({currentUser}) {
    if (location.pathname === '/' || location.pathname === '/home') {
      return (<Home document={$} currentUser={currentUser} />);
    } else if ( location.pathname.match(/^\/\d+\/[\w]+(-[\w]+)*(\/\d+)?$/) ) {
      return (<CommentThread document={$} currentUser={currentUser} />);
    } else if ( location.pathname === '/confirm_email' ) {
      return (<ConfirmEmail />);
    } else if ( location.pathname === '/register' ) {
      return (<Register document={$} />);
    } else if ( location.pathname === '/search' ) {
      return (<SearchResults document={$} currentUser={currentUser} />);
    } else if ( location.pathname === '/trending' ) {
      return (<Trending document={$} currentUser={currentUser} />);
    }

  }

  render() {
    return (
      <div>
        <Header currentUser={currentUser} document={$} />
        { this.renderRequiredComponent({currentUser}) }
        <Footer />
      </div>
    );
  }
}

generateNewApplicationContainer({
  renderer: ReactDOM.render,
  container: <App />,
  ignoredRoutes: ['/login']
});
