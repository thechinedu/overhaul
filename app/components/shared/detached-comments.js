import React from 'react';

import withProfileImage from 'utils/hoc/with-profile-image';

@withProfileImage
class DetachedComment extends React.Component {
  render() {
    const {
      wrapperClass,
      section,
      threadTitle,
      userName,
      timestamp,
      content,
      profileImage } = this.props;

    return (
      <div className={wrapperClass}>
        <div className="metadata">
          <img
            src={profileImage}
            alt="profile image"
            className="profile-image"
          />
          <span className="username">
            {userName}
          </span>

          <span className="thread-category">
            <i className="fa fa-folder-open"></i>
            {section}
          </span>

          <span className="timestamp">
            <i className="fa fa-clock-o"></i>
            {timestamp}
          </span>

          <div className="thread-title">
            <h3>
              {threadTitle}
            </h3>
          </div>
        </div>

        <div
          className="content"
          dangerouslySetInnerHTML={{__html: content}}
        >
        </div>
      </div>
    );
  }
}

const mapComments = (comments, wrapperClass, currentUser) => {
  return comments.map( (comment, index) => (
    <DetachedComment
      key={index}
      currentUser={currentUser}
      wrapperClass={wrapperClass}
      section={comment.section}
      threadTitle={comment.threadTitle}
      userName={comment.userName}
      timestamp={comment.timestamp}
      content={comment.content}
    />
  ));
};

const useClassName = (val, defaultVal) =>
  val ? `${val} ${defaultVal}` : defaultVal;

const DetachedComments = ({ containerClass, itemClass, comments, currentUser }) => {
  const wrapperClass = useClassName(containerClass, 'detached-comments');
  const wrapperItem = useClassName(itemClass, 'detached-comment');

  return (
    <div className={wrapperClass}>
      { mapComments(comments, wrapperItem, currentUser) }
      { !comments.length && <p>No results found</p> }
    </div>
  );
};

export default DetachedComments;
