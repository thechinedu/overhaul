import React from 'react';
import cheerio from 'cheerio';

import lastPageCount from 'utils/get-last-page-count';

const loadPaginatedData = pageData => EnhancedComponent => {
  /*eslint-disable react/display-name*/
  return class extends React.Component {
    state = {
      data: pageData.paginateableData(this.props.document),
      nextPage: 1,
      lastPage: lastPageCount(this.props.document),
      fetchingNewData: false
    }

    fetchData = async () => {
      const urlPath = pageData.urlPath || location.pathname;
      const { data, nextPage } = this.state;
      this.setState({ fetchingNewData: true });

      const res = await fetch(`${urlPath}/${nextPage}`);
      const html = await res.text();
      const $ = cheerio.load(html);
      const newData = pageData.paginateableData($);
      const updatedData = data.concat(newData);

      this.setState({
        data: updatedData,
        nextPage: nextPage + 1,
        fetchingNewData: false
      });
    }

    render() {
      return (
        <EnhancedComponent data={this.state.data} {...this.props}>
          { this.state.nextPage <= this.state.lastPage &&
            <button
              onClick={this.fetchData}
              className="btn--load-more"
            >
              Load more
              {this.state.fetchingNewData &&
                <i className="fa fa-spinner fa-pulse"></i>
              }
            </button>
          }
        </EnhancedComponent>
      );
    }
  };
};

export default loadPaginatedData;
