import React from 'react';
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';

import Header from './components/shared/header';
import Footer from './components/shared/footer';
import Home from './components/home';
import CommentThread from './components/comment-thread';
import ConfirmEmail from './components/confirm-email';
import Register from './components/register';
import Profile from './components/profile';
import CompositeThreadList from './components/shared/composite-thread-list';
import CompositeCommentList from './components/shared/composite-comment-list';

import generateNewApplicationContainer from 'utils/generate-app-container';
import searchQuery from 'utils/search-query';

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
    } else if ( location.pathname === '/trending' ) {
      return (
        <CompositeThreadList
          document={$}
          currentUser={currentUser}
          sectionClass={'trending-page'}
          headerTitle={'Trending Topics'}
        />
      );
    } else if ( location.pathname === '/topics' ) {
      return (
        <CompositeThreadList
          document={$}
          currentUser={currentUser}
          sectionClass={'new-topics-page'}
          headerTitle={'New Topics'}
        />
      );
    } else if ( location.pathname === '/recent' ) {
      return (
        <CompositeCommentList
          document={$}
          currentUser={currentUser}
          sectionClass={'recent-topics-page'}
          headerTitle={'Recent Topics'}
        />
      );
    } else if ( location.pathname === '/search' ) {
      return (
        <CompositeCommentList
          document={$}
          currentUser={currentUser}
          sectionClass={'search-page'}
          headerTitle={`Search results for ${searchQuery()}`}
        />
      );
    } else if ( location.pathname.match(/^\/[\w]+$/) ) {
      return (<Profile document={$} currentUser={currentUser}/>);
    } else if ( location.pathname.match(/^\/[\w]+\/topics$/) ) {
      return (<CompositeThreadList document={$} currentUser={currentUser} />);
    } else if ( location.pathname.match(/^\/[\w]+\/posts/) ) {
      return (<CompositeCommentList document={$} currentUser={currentUser} />);
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
  notImplementedRoutes: ['/login', '/editprofile']
});
