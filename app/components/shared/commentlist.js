import React from 'react';

import withProfileImage from 'utils/hoc/with-profile-image';

@withProfileImage
class Comment extends React.Component {
  render() {
    const { createdAt, commentBody, userName, profileImage } = this.props;

    return (
      <div className="comment-item">
        <div className="profile-pic">
          <img src={profileImage} alt="profile image" className="profile-image" />
        </div>

        <div className="comment-details">
          <span className="username">
            <a href={`/${userName}`}>
              { userName }
            </a>
          </span>

          <span className="comment-added-date">
            { createdAt }
          </span>

          <div
            className="comment"
            dangerouslySetInnerHTML={{__html: commentBody}}
          >
          </div>
        </div>
      </div>
    );
  }
}

const mapCommentsList = (comments, currentUser) => {
  return comments.map( ({userName, createdAt, commentBody}, index) => (
    <Comment
      key={index}
      currentUser={currentUser}
      userName={userName}
      createdAt={createdAt}
      commentBody={commentBody}
    />
  ));
};

const CommentList = ({ comments, currentUser }) => {
  return (
    <div className="comment-items">
      { mapCommentsList(comments, currentUser) }
    </div>
  );
};

export default CommentList;
