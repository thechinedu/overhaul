import React from 'react';
import renderHTML from 'react-render-html';

const Comment = ({ userName, createdAt, commentBody }) => {
  return (
    <div className="comment-item">
      <div className="profile-pic">
        <img src="http://placehold.it/50x50/3dd97e/ffffff?text=d" alt="" style={{borderRadius: "50%"}} className="image" />
      </div>

      <div className="comment-details">
        <span className="username">
          { userName }
        </span>

        <span className="comment-added-date">
          { createdAt }
        </span>

        <div className="comment">
          { renderHTML(commentBody) }
        </div>
      </div>
    </div>
  )
};

const mapCommentsList = (comments) => {
  return comments.map( ({userName, createdAt, commentBody}, index) => (
    <Comment
      key={index}
      userName={userName}
      createdAt={createdAt}
      commentBody={commentBody}
    />
  ));
};

const CommentList = ({ comments }) => {
  return (
    <div className="comment-items">
      { mapCommentsList(comments) }
    </div>
  );
};

export default CommentList;
