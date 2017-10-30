import React from 'react';
import ThreadItem from 'shared/threaditem';

const mapThreadList = (threads) => {
  return threads.map( (thread, index) => {
    return <ThreadItem text={thread.text} url={thread.url} key={index} />
  });
};

const ThreadList = ({ threads }) => {
  return (
    <div className="thread-items">
      { mapThreadList(threads) }
    </div>
  )
};

export default ThreadList;

