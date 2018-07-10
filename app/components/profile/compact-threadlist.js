import React from 'react';
import ThreadList from 'shared/threadlist';

const url = location.pathname;

const CompactThreadList = ({threads, currentUser}) => (
  <div>
    <ThreadList
      threads={threads}
      currentUser={currentUser}
    />
    <div className="button-group">
      <a href={`${url}/topics`}>
        View all topics
      </a>

      <a href={`${url}/posts`}>
        View all posts
      </a>
    </div>
  </div>
);

export default CompactThreadList;
