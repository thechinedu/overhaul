import React from 'react';

import withProfileImage from 'utils/hoc/with-profile-image';

@withProfileImage
class FollowCard extends React.Component {
  render() {
    const { userName, profileImage } = this.props;

    return (
      <a href={`/${userName}`}>
        <div className="user__follow-card">
          <div className="user__user-info">
            <img
              className="profile-image"
              src={profileImage}
              alt="profile image"
            />
            <span className="username">
              {userName}
            </span>
          </div>

          {/* <button className="user__follow-state">
          Follow
        </button> */}
        </div>
      </a>
    );
  }
}

const mapFollowCards = (followList, currentUser) => (
  followList.map((userName, index) => (
    <FollowCard
      userName={userName}
      currentUser={currentUser}
      key={index}
    />
  ))
);

const FollowList = ({list, currentUser}) => (
  <div className="user__following-list">
    { mapFollowCards(list, currentUser) }
    {!list.length && <p>
      Nothing to show
    </p>}
  </div>
);

export default FollowList;
