const data = {}

data.headerTitle = $ => $('#up ~ h2').text();

data.SubSectionList = $ => {
  const list = Array.from($('table[summary]:not(#up) tr'));
  const res = [];

  list.forEach(node => {
    const elem = $(node),
      title =  elem.find('td > b').text(),
      url = elem.find('td > b > a').attr('href')

    res.push({title, url})
  });

  return res;
}

data.tabList = $ => {
  const list = Array.from($('table[summary]:not(#up) tr:first-child a'));
  const res = [];

  list.forEach(node => {
    const elem = $(node),
      title = elem.text(),
      url = elem.href()

    res.push({title, url})
  });

  return res;
}

data.topicList = $ => {
  const list = Array.from($('table:not(#up):not(#down):not([summary]) tr:not(:first-of-type)'));
  const res = [];

  list.forEach(node => {
    const elem = $(node),
      text = elem.find('td > b').text(),
      url = elem.find('td > b > a').attr('href'),
      ownerName = elem.find('td .s b:first-of-type a').text() || 'nobody',
      commentCount = elem.find('td .s b:nth-of-type(2)').text(),
      viewsCount = elem.find('td .s b:nth-of-type(3)').text()

    res.push({text, url, ownerName, commentCount, viewsCount});
  });

  return res;
};

data.paginateableData = data.topicList;

export default data;
