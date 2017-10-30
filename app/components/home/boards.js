import React from 'react';

const renderBoard = ({name, title, url}, key) => {
  return (
    <li key={key} className={ title.includes('class=g') ? 'main' : '' }>
      <a href={url}>
        { name }
      </a>
    </li>
  )
};

const Boards = ({ sections }) => {
  return (
    <ul className="board-listing">
      { sections.map( (boardItem, index) => renderBoard(boardItem, index) ) }
    </ul>
  );
};

export default Boards;