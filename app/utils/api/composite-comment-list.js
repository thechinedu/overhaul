const data = {};

data.commentList = (doc) => {
  const container = doc('.body > table:nth-of-type(2)'),
    titles = Array.from(container.find('.bold.l.pu')),
    content = Array.from(container.find('.narrow')),
    res = [];

  content.forEach((node, index) => {
    const titleBar = doc(titles[index]),
      userName = titleBar.find('.user').text() || 'nobody',
      section = titleBar.find('a[href]').eq(0).text(),
      threadTitle = titleBar.find('a[href]').eq(1).text(),
      timestamp = titleBar.find('.s').text(),
      content = doc(node).html();

    res.push({ userName, section, threadTitle, timestamp, content });
  });

  return res;
};

data.headerTitle = $ => $('#up ~ h2').text();

data.paginateableData = data.commentList;

export default data;

// [
//  {
//    userName: 'damilare',
//    section: 'Tv / Movies',
//    threadTitle: 'Hello world'
//    timestamp: '10:29pm',
//    content: 'lorem ipsum....', // Will be saved as an html string
//
//  }
// ]
