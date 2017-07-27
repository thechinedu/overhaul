import React from 'react';
import ReactDOM from 'react-dom';
import cheerio from 'cheerio';

import Header from './components/shared/header';
import Footer from './components/shared/footer';
import Home from './components/home';

import removeOldStyles from 'utils/remove-old-styles';
import generateNewApplicationContainer from 'utils/generate-app-container';

const $ = cheerio.load(document.body.innerHTML);
const userName = $('#up .user').text();

removeOldStyles();
generateNewApplicationContainer();

import './styles/default/overhaul.scss';

class App extends React.Component {
  renderRequiredComponent() {
    if (true) {
      return <Home document={$} />
    }
  }

  render() {
    return (
      <div>
        <Header user={userName} />
        { this.renderRequiredComponent() }
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));