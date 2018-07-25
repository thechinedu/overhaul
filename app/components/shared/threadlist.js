import React from 'react';
import ThreadItem from 'shared/threaditem';

const mapThreadList = (threads, currentUser) => {
  return threads.map( (thread, index) => {
    return (
      <ThreadItem
        text={thread.text}
        url={thread.url}
        threadOwnerName={thread.ownerName}
        threadSection={thread.section}
        threadCommentCount={thread.commentCount}
        threadViewsCount={thread.viewsCount}
        key={index}
        currentUser={currentUser}
      />
    );
  });
};

const ThreadList = ({ threads, currentUser }) => {
  return (
    <div className="thread-items">
      { mapThreadList(threads, currentUser) }
    </div>
  )
};

export default ThreadList;
