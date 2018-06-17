import React from 'react';
import renderHTML from 'react-render-html';
import threadDetails from 'utils/api/thread-details';

class Comment extends React.Component {
  state = {
    profileImage: 'http://placehold.it/35x35'
  }

  async componentDidMount() {
    const { currentUser, userName } = this.props;
    const profileImage = await threadDetails.fetchOwnerImage(currentUser, userName);

    this.setState({ profileImage });
  }

  render() {
    const { profileImage } = this.state;
    const { createdAt, commentBody, userName } = this.props;

    return (
      <div className="comment-item">
        <div className="profile-pic">
          <img src={profileImage} alt="profile image" className="profile-image" />
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
