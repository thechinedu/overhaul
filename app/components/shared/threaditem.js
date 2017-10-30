import React from 'react';
import threadDetails from 'utils/api/thread-details';
import cheerio from 'cheerio';

export default class ThreadItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      threadOwnerName: '',
      threadSection: ''
    };
  }

  componentDidMount() {
    threadDetails.fetchOwnerDetails(this.props.url).then( data => {
      let doc = cheerio.load(data),
          threadOwnerName = doc('table[summary=posts] .user').first().text(),
          threadSection = doc('.body > h2 + .bold a:nth-of-type(3)').text();

      this.setState( () => ( { threadOwnerName, threadSection } ));
    });
  }

  render() {
    return (
      <div className="thread-item">
        <a href={this.props.url}>
          { this.props.text }
        </a>

        <div className="metadata">
          <div className="thread-owner-details">
            {/* { threadDetails.fetchOwnerImage(url) } */}
            <img src="http://placehold.it/35x35/3dd97e/ffffff?text=d" alt="" style={{borderRadius: "50%"}} className="image" />
            <span className="username">
              { this.state.threadOwnerName }
            </span>
          </div>

          <div className="thread-section">
            <i className="fa fa-folder-open"></i>
            <span>
              { this.state.threadSection }
            </span>
          </div>

          <div className="thread-comment-count">
            <i className="fa fa-comments"></i>
            <span>
              {/* { threadDetails.fetchTotalCommentCount(url) } */}
              23
            </span>
          </div>
        </div>

      </div>
    );
  }
}



// const ThreadItem = ({ text, url }) => {
//   return (
//     <div className="thread-item">
//       <a href={url}>
//         { text }
//       </a>
//
//       <div className="metadata">
//         <div className="thread-owner-details">
//           {/* { threadDetails.fetchOwnerImage(url) } */}
//           <img src="http://placehold.it/35x35/3dd97e/ffffff?text=d" alt="" style={{borderRadius: "50%"}} className="image" />
//           <span className="username">
//             { threadDetails.fetchOwnerName(url) }
//           </span>
//         </div>
//
//         <div className="thread-section">
//           <i className="fa fa-folder-open"></i>
//           <span>
//             {/* { threadDetails.fetchThreadSectionName(url) } */}
//             politics
//           </span>
//         </div>
//
//         <div className="thread-comment-count">
//           <i className="fa fa-comments"></i>
//           <span>
//             {/* { threadDetails.fetchTotalCommentCount(url) } */}
//             23
//           </span>
//         </div>
//       </div>
//
//     </div>
//   )
// };