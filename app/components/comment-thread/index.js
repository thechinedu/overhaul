import React from 'react';
import cheerio from 'cheerio';

import CommentList from 'shared/commentlist';
import pageData from 'utils/api/comment-thread';
import lastPageCount from 'utils/get-last-page-count';

/*
pageData.commentThreadTitle ==> String
ex. Buhari does some presedential sh*t again.

pageData.comments ==> Array
ex.
[
 {
   userName: 'damilare',
   gender: 'm|f|null',
   createdAt: '10:29pm on Aug 06',
   commentBody: 'lorem ipsum....', // Will be saved as an html string

 }
]

*/

export default class CommentThread extends React.Component {
  state = {
    threadTitle: pageData.commentThreadTitle(this.props.document),
    comments: pageData.comments(this.props.document),
    nextPage: 1,
    lastPage: lastPageCount(this.props.document)
  }

  fetchComments = () => {
    fetch(`${location.pathname}/${this.state.nextPage}`).then(res => {
      res.text().then(html => {
        const $ = cheerio.load(html)
        const newComments = pageData.comments($),
              updatedComments = this.state.comments.concat(newComments);

        this.setState({
          comments: updatedComments,
          nextPage: this.state.nextPage + 1
        })
      });
    });
  }

  render() {
    return (
      <section className="wrapper comments-page">
        <header className="thread-title">
          <h1>
            { this.state.threadTitle }
          </h1>
        </header>

        <main className="comments">
          <CommentList comments={ this.state.comments } />
        </main>

        <aside className="page-actions">
          <button className="reply">Reply</button>
          <button className="follow-thread">
            <i className="fa fa-star-o"></i>
            Follow
          </button>
        </aside>

        { this.state.nextPage <= this.state.lastPage &&
          <button onClick={this.fetchComments}>Load more</button>}
      </section>
    );
  }
}
