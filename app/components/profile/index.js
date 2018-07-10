import React from 'react';
import CompactThreadList from './compact-threadlist';
import FollowList from './follow-list';
import ProfileCard from './profile-card';

import pageData from 'utils/api/profile';

export default class Profile extends React.Component {
  state = {
    showingTopics: true,
    showingFollowList: false,
    defaultProfileHeaderBg: 'https://image.ibb.co/k1Njuk/Stock_Snap_T2_SO7_MDTYS.jpg'
  }

  render() {
    const { defaultProfileHeaderBg } = this.state;
    const { document: doc, currentUser } = this.props;
    const {
      userName,
      profileImage,
      profileMetadata,
      topicList,
      followingList
    } = pageData.init(doc);

    return (
      <section className="profile-page">
        <header className="profile__header">
          <div
            className="profile__header-bg"
            style={{
              backgroundImage: `url(${profileImage || defaultProfileHeaderBg}`
            }}></div>

          <div>
            <h1>
              { userName }
            </h1>
          </div>
        </header>

        <div className="tab__switcher">
          <span
            className={
              `tab__control ${this.state.showingTopics ? 'active' : null}`
            }
            onClick={() => {
              this.setState({
                showingTopics: true,
                showingFollowList: false,
              });
            }}
          >
            Topics
          </span>

          <span
            className={
              `tab__control ${this.state.showingFollowList ? 'active' : null}`
            }
            onClick={() => {
              this.setState({
                showingTopics: false,
                showingFollowList: true
              });
            }}
          >
            Following
          </span>
        </div>

        <ProfileCard
          profileImage={profileImage}
          profileMetadata={profileMetadata}
        />

        <main className="user__posts">
          {this.state.showingTopics && <CompactThreadList
            threads={topicList}
            currentUser={currentUser}
          />}

          {this.state.showingFollowList && <FollowList
            list={followingList}
            currentUser={currentUser}
          />}
        </main>
      </section>
    );
  }
}
