import React from 'react';
import DetachedComments from 'shared/detached-comments';
import pageData from 'utils/api/search-results';
import searchQuery from 'utils/search-query';

import withPaginateableData from 'utils/hoc/with-paginateable-data';

@withPaginateableData(pageData)
export default class SearchResults extends React.Component {
  render() {
    const { currentUser, data: searchResults } = this.props;

    return (
      <section className="wrapper search-page">
        <header className="search-query">
          <h1>Search results for {searchQuery()}</h1>
        </header>

        <main>
          <DetachedComments
            containerClass="search-results"
            itemClass="search-result"
            comments={searchResults}
            currentUser={currentUser}
          />

          {this.props.children}
        </main>
      </section>
    );
  }
}
