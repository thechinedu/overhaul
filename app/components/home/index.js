import React from 'react';
import pageData from 'utils/api/home';
import ThreadList from './threadlist';

/*
pageData.featured ==> Array
ex. [ { title: 'Nnamdi Kanu does some biafra realted thing again', url: 'http://nairaland.com/xyz' } ]

pageData.boards ==> Array
ex. [ {name: 'Nairaland/General', url: 'http://nairaland.com/xyz'} ]
*/

export default class Home extends React.Component {
  render() {
    // console.log(pageData.boards(this.props.document), pageData.featured(this.props.document));
    return (
      <section className="wrapper">
        <aside className="boards">
          Discussions
        </aside>

        <main className="featured-threads">
          <ThreadList threads={pageData.featured(this.props.document)} />
        </main>
      </section>
    );
  }
}