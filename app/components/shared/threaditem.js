import React from 'react';
import threadDetails from 'utils/api/thread-details';
import cheerio from 'cheerio';

export default class ThreadItem extends React.Component {
  state = {
    threadOwnerName: '',
    threadSection: '',
    commentCount: '',
    profileImage: 'http://via.placeholder.com.com/35x35'
  }

  async componentDidMount() {
    const { currentUser,
      url,
      threadOwnerName ,
      threadSection,
      threadCommentCount
    } = this.props;
    let html, doc;

    if (!threadOwnerName && !threadSection && !threadCommentCount) {
      html = await threadDetails.fetchOwnerDetails(url);
      doc = cheerio.load(html);
    }
    const ownerName = threadOwnerName || doc('table[summary=posts] .user').first().text();
    const section = threadSection || doc('.body > h2 + .bold a:nth-of-type(3)').text();
    const profileImage = await threadDetails.fetchOwnerImage(currentUser, ownerName);

    await this.setTotalCommentCount(threadCommentCount);
    this.setState( () => ( { threadOwnerName, threadSection: section, profileImage } ));
  }

  async setTotalCommentCount(count) {
    const { url } = this.props;
    const commentCount = count || await threadDetails.fetchTotalCommentCount(url);

    this.setState({ commentCount });
  }

  render() {
    const { url, text } = this.props;
    const { threadOwnerName, threadSection, commentCount, profileImage } = this.state;

    return (
      <div className="thread-item">
        <a href={url}>
          { text }
        </a>

        <div className="metadata">
          <div className="thread-owner-details">
            <img src={profileImage} alt="profile image" className="profile-image" />
            <span className="username">
              { threadOwnerName }
            </span>
          </div>

          <div className="thread-section">
            <i className="fa fa-folder-open"></i>
            <span>
              { threadSection }
            </span>
          </div>

          <div className="thread-comment-count">
            <i className="fa fa-comments"></i>
            <span>
              { commentCount }
            </span>
          </div>
        </div>

      </div>
    );
  }
}
