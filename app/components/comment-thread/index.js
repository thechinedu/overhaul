import React from 'react';
import CommentList from 'shared/commentlist';
import pageData from 'utils/api/comment-thread';

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

export default class ClassName extends React.Component {
  render() {
    return (
      <section className="wrapper comments-page">
        <header className="thread-title">
          <h1>
            { pageData.commentThreadTitle(this.props.document) }
          </h1>
        </header>

        <main className="comments">
          <CommentList comments={ pageData.comments(this.props.document) } />
        </main>

        <aside className="page-actions">
          <button className="reply">Reply</button>
          <button className="follow-thread">
            <i className="fa fa-star-o"></i>
            Follow
          </button>
        </aside>
      </section>
    );
  }
}