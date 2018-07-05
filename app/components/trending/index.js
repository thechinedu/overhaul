import React from 'react';
import ThreadList from 'shared/threadlist';

import pageData from 'utils/api/trending';

import withPaginateableData from 'utils/hoc/with-paginateable-data';

@withPaginateableData(pageData)
export default class Trending extends React.Component {
  render() {
    const { currentUser, data: threads } = this.props;

    return (
      <section className="wrapper trending-page">
        <header>
          <h1>
            Trending topics
          </h1>
        </header>

        <main>
          <ThreadList
            threads={threads}
            currentUser={currentUser}
          />

          {this.props.children}
        </main>
      </section>
    );
  }
}
