import React from 'react';

const mapThreadList = (threads) => {
  return threads.map( (thread, index) => {
    return <ThreadItem text={thread.text} url={thread.url} key={index} />
  });
};

const ThreadItem = ({ text, url }) => {
  return (
    <div className="thread-item">
      <a href={url}>
        { text }
      </a>

      <div className="metadata">
        <div className="thread-owner-details">
          <img src="http://placehold.it/35x35/3dd97e/ffffff?text=d" alt="" style={{borderRadius: "50%"}} className="image" />
          <span className="username">
            Dormammu
          </span>
        </div>

        <div className="thread-section">
          <i className="fa fa-folder-open"></i>
          <span>
            politics
          </span>
        </div>

        <div className="thread-comment-count">
          <i className="fa fa-comments"></i>
          <span>
            23
          </span>
        </div>
      </div>

    </div>
  )
};

const ThreadList = ({ threads }) => {
  return (
    <div className="thread-items">
      { mapThreadList(threads) }
    </div>
  )
};

export default ThreadList;

