import React from 'react';
import DetachedComments from 'shared/detached-comments';
import searchQuery from 'utils/search-query';
import pageData from 'utils/api/composite-comment-list';

if (location.pathname === '/search') {
  pageData.urlPath = `/search/${searchQuery()}/0/0/0`;
}

import withPaginateableData from 'utils/hoc/with-paginateable-data';

@withPaginateableData(pageData)
export default class CompositeCommentList extends React.Component {
  render() {
    const {
      currentUser,
      data: comments,
      headerTitle,
      sectionClass,
      document: doc
    } = this.props;

    return (
      <section className={`wrapper composite__comment-list ${sectionClass}`}>
        <header className="composite__comment-list-header">
          <h1>{headerTitle || pageData.headerTitle(doc)}</h1>
        </header>

        <main>
          <DetachedComments
            containerClass="search-results"
            itemClass="search-result"
            comments={comments}
            currentUser={currentUser}
          />

          {this.props.children}
        </main>
      </section>
    );
  }
}
