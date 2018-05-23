import React from 'react';
import threadDetails from 'utils/api/thread-details';
import cheerio from 'cheerio';

export default class ThreadItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      threadOwnerName: '',
      threadSection: '',
      commentCount: ''
    };
  }

  componentDidMount() {
    threadDetails.fetchOwnerDetails(this.props.url).then( data => {
      const doc = cheerio.load(data),
            threadOwnerName = doc('table[summary=posts] .user').first().text(),
            threadSection = doc('.body > h2 + .bold a:nth-of-type(3)').text();

      this.setTotalCommentCount();

      this.setState( () => ( { threadOwnerName, threadSection } ));
    });
  }

  setTotalCommentCount() {
    const res = threadDetails.fetchTotalCommentCount(this.props.url);

    res.then(commentCount => { this.setState({ commentCount }) });
  }

  render() {
    const { url, currentUser, text } = this.props;
    const { threadOwnerName, threadSection, commentCount } = this.state;
    const threadOwnerImage = threadDetails.fetchOwnerImage(currentUser, threadOwnerName);

    return (
      <div className="thread-item">
        <a href={url}>
          { text }
        </a>

        <div className="metadata">
          <div className="thread-owner-details">
            <img src={threadOwnerImage} alt="" style={{borderRadius: "50%"}} className="image" />
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
