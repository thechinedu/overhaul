import React from 'react';
import threadDetails from 'utils/api/thread-details';

const withProfileImage = EnhancedComponent => {
  /*eslint-disable react/display-name*/
  return class extends React.Component {
    state = {
      profileImage: 'http://via.placeholder.com/35x35'
    }

    async componentDidMount() {
      const { currentUser, userName } = this.props;
      const properties = [currentUser, userName ? userName : undefined];
      const profileImage = await threadDetails.fetchOwnerImage(...properties);

      this.setState({ profileImage });
    }

    render() {
      return (
        <EnhancedComponent
          profileImage={this.state.profileImage}
          {...this.props}
        />
      );
    }
  };
};

export default withProfileImage;
