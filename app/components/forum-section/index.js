import React from 'react';
import cheerio from 'cheerio';
import ThreadList from '../shared/threadlist';
import SubSectionsList from './subsectionList'

import pageData from '../../utils/api/forum-section';

import withPaginateableData from 'utils/hoc/with-paginateable-data';

@withPaginateableData(pageData)

export default class ForumSection extends React.Component {
  state = {
    currentTab: 'updated',
    data: pageData.topicList(this.props.document)
  }

  fetchTabData = async () => {
    console.log("I'm in here")
    const urlPath = location.pathname
    const { currentTab } = this.state

    // console.log(`${urlPath}/${currentTab}`, "fferferfe")

    const res = await fetch(`${urlPath}/${currentTab}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const newData = pageData.topicList($);

    // console.log(this.state.data, "old DATA")
    
    this.setState({
      data: newData
    });

    // console.log(this.state.data, "new DATA")
  }

  click = (tab) => {
    console.log('Im inside the onclick function I want to go home too')
    this.setState({
      currentTab: tab
    })
  }
  
  render() {
    const {
      currentUser,
      data: threads,
      document: doc,
    } = this.props;

    const subSections =  pageData.SubSectionList(doc)
    // console.log(subSections, "subSections")
    console.log(this.props.currentTab, "tab current");

    return (
      <section className="wrapper composite__thread-list">
        <header className="composite__thread-list-header">
          <h1>
            {pageData.headerTitle(doc)}
          </h1>
        </header>

        <main className="subsection__list">
          {subSections && <SubSectionsList subSections={subSections} />}
        </main>

        <div className="tab__switcher">
          <span
            className={
              `tab__control ${this.state.currentTab === 'posts' ? 'active' : null}`
            }
            onClick={this.click('posts')}
          >
            Posts
          </span>

          <span
            className={
              `tab__control ${this.state.currentTab == 'views' ? 'active' : null}`
            }
            onClick={this.click('views')}
          >
            Views
          </span>

          <span
            className={
              `tab__control ${this.state.currentTab == 'updated' ? 'active' : null}`
            }
            // onClick={() => {
            //   this.setState({
            //     currentTab: 'updated'
            //   });
            // }}
          >
            Updated
          </span>

          <span
            className={
              `tab__control ${this.state.currentTab == 'new' ? 'active' : null}`
            }
            // onClick={() => {
            //   this.setState({
            //     currentTab: 'new'
            //   });
            // }}
          >
            New
          </span>
        </div>

        <main className="main__content">
          <ThreadList
            threads={this.state.data}
            currentUser={currentUser}
          />

          {this.props.children}
        </main>
      </section>
    );
  }
}
