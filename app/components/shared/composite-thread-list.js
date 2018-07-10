import React from 'react';
import ThreadList from './threadlist';

import pageData from 'utils/api/composite-thread-list';

import withPaginateableData from 'utils/hoc/with-paginateable-data';

@withPaginateableData(pageData)
export default class CompositeThreadList extends React.Component {
  render() {
    const {
      currentUser,
      headerTitle,
      sectionClass,
      data: threads,
      document: doc
    } = this.props;

    return (
      <section className={`wrapper composite__thread-list ${sectionClass}`}>
        <header className="composite__thread-list-header">
          <h1>
            {headerTitle || pageData.headerTitle(doc)}
          </h1>
        </header>

        <main className="main__content">
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
