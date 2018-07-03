import React from 'react';

import CommentList from 'shared/commentlist';
import pageData from 'utils/api/comment-thread';

import withPaginateableData from 'utils/hoc/with-paginateable-data';
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

@withPaginateableData(pageData)
export default class CommentThread extends React.Component {
  state = {
    threadTitle: pageData.commentThreadTitle(this.props.document)
  }

  render() {
    const { currentUser, data: comments } = this.props;

    return (
      <section className="wrapper comments-page">
        <header className="thread-title">
          <h1>
            { this.state.threadTitle }
          </h1>
        </header>

        <main className="comments">
          <CommentList
            currentUser={currentUser}
            comments={ comments }
          />
        </main>

        <aside className="page-actions">
          <button className="reply">Reply</button>
          <button className="follow-thread">
            <i className="fa fa-star-o"></i>
            Follow
          </button>
        </aside>

        {this.props.children}
      </section>
    );
  }
}
