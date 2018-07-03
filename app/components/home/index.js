import React from 'react';
import cheerio from 'cheerio';

import pageData from 'utils/api/home';
import lastPageCount from 'utils/get-last-page-count';

import ThreadList from 'shared/threadlist';
import Boards from './boards';

/*
pageData.featured ==> Array
ex. [ { title: 'Nnamdi Kanu does some biafra related thing again', url: 'http://nairaland.com/xyz' } ]

pageData.boards ==> Array
ex. [ {name: 'Nairaland/General', url: 'http://nairaland.com/xyz'} ]
*/

export default class Home extends React.Component {
  state = {
    document: this.props.document,
    boards: pageData.boards(this.props.document),
    threadList: pageData.currentFeaturedLinks(this.props.document),
    nextPage: 1,
    lastPage: 2646,
    fetchingThreads: false
  }

  fetchThreads = () => {
    this.setState({ fetchingThreads: true });

    fetch(`/links/${this.state.nextPage}`).then(res => {
      res.text().then(html => {
        const $ = cheerio.load(html),
          newThreads = pageData.oldFeaturedLinks($),
          updatedThreadList = this.state.threadList.concat(newThreads);

        this.setState({
          threadList: updatedThreadList,
          nextPage: this.state.nextPage + 1,
          lastPage: lastPageCount($),
          fetchingThreads: false
        });
      });
    });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <section className="wrapper homepage">
        <aside className="boards">
          <Boards sections={this.state.boards} />
        </aside>

        <main className="featured-threads">
          <ThreadList threads={this.state.threadList} currentUser={currentUser} />

          { this.state.nextPage <= this.state.lastPage &&
            <button onClick={this.fetchThreads} className="btn--load-more">
              Load more
              {this.state.fetchingThreads &&
                <i className="fa fa-spinner fa-pulse"></i>
              }
            </button>
          }
        </main>
      </section>
    );
  }
}
