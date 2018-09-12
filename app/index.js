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
import ForumSection from './components/forum-section';
import generateNewApplicationContainer from 'utils/generate-app-container';
import searchQuery from 'utils/search-query';

const $ = cheerio.load(document.body.innerHTML);
const currentUser = $('#up .user').text();
const forumSections = ['nairaland', 'politics', 'foreign-affairs', 'racism-tribalism', 'crime', 'dating', 'sexuality', 'romance', 'jobs', 'career', 'business', 'b2b', 'adverts', 'investment', 'nysc', 'education', 'education-ads']

import './styles/default/overhaul.scss';

class BetaMessage extends React.Component {
  state = {
    infoVisible: true
  }

  render() {
    const { infoVisible } = this.state;
    return (
      <div style={{
        background: '#3dd97e',
        color: '#fff',
        zIndex: 99999999,
        position: 'fixed',
        fontSize: '13px',
        bottom: '0',
        width: '20%',
        padding: '0 10px',
        lineHeight: '1.25'
      }}>
        {infoVisible &&
          <span
            style={{
              position: 'absolute',
              right: '10px',
              fontSize: '40px',
              cursor: 'pointer'
            }}
            onClick={() => {
              this.setState({
                infoVisible: !infoVisible
              });
            }}
          >
            &times;
          </span>
        }
        <h3>
          BETA
          {!infoVisible &&
            <span style={{
              background: '#465774',
              color: '#fff',
              padding: '7px 12px',
              borderRadius: '5px',
              float: 'right',
              fontWeight: 'normal',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            onClick={() => {
              this.setState({
                infoVisible: !infoVisible
              });
            }}
            >
              show more
            </span>}
        </h3>
        {infoVisible && <p>
          Thanks for trying out overhaul. This product is still in beta so
          you might encounter some broken or missing features. You can submit
          bugs and feature requests
          <a
            href="https://github.com/blueyedgeek/overhaul/issues"
            style={{
              color: '#fff',
              textDecoration: 'underline',
              padding: '0 5px'
            }}
          >
            here.
          </a>
          If you ever want to switch back to the old nairaland design,
          you can do that by disabling the extension from the extensions page.

          <a
            href="mailto:chinedudaniel7@gmail.com?subject=Feedback+for+overhaul"
            style={{
              background: '#465774',
              display: 'block',
              textAlign: 'center',
              padding: '7px 12px',
              color: '#fff',
              marginTop: '10px',
              borderRadius: '5px'
            }}
          >
            Send Feedback
          </a>
        </p>}
      </div>
    );
  }
}

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
    } else if (forumSections.includes(location.pathname.split('/')[1])) {
      return (<ForumSection document={$} currentUser={currentUser} currentTab={location.pathname.split('/')[2]} />);
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
        <BetaMessage />
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
