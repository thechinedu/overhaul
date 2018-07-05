const data = {};

data.threadList = ($) => {
  const list = Array.from($('table:not(#up):not(#down) tr'));
  const res = [];

  list.forEach(node => {
    const elem = $(node),
      text = elem.find('td > b + b').text(),
      url = elem.find('td > b + b > a').attr('href'),
      section = elem.find('td > b:first-of-type').text(),
      ownerName = elem.find('td .s b:first-of-type a').text() || 'nobody',
      commentCount = elem.find('td .s b:nth-of-type(2)').text();

    res.push({text, url, section, ownerName, commentCount});
  });

  return res;
};

data.paginateableData = data.threadList;

export default data;
