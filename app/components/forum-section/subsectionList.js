import React from 'react';

const mapSubSectionList = (subSections) => {
  return subSections.map((subSection, index) => {
    return (
      <li key={index}>
        <a href={subSection.url}>
          {subSection.title}
        </a>
      </li>
    )
  })
};

const SubSectionList = ({ subSections }) => {
  return (
    <div>
      { mapSubSectionList(subSections) }
    </div>
  )
};

export default SubSectionList;
