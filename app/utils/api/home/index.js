const data = {};

data.featured = (doc) => {
  const featured = Array.from(doc('.boards .featured a')),
        res = [];

  featured.forEach( elem => {
    const cheerioElem = doc(elem),
          text = cheerioElem.text(),
          url = cheerioElem.attr('href'),
          obj = { text, url };

    res.push(obj);
  });

  return res;
};

data.boards = (doc) => {
  const boards = Array.from(doc('.boards').first().find('td.l a')),
        res = [];

  boards.forEach( elem => {
    const cheerioElem = doc(elem),
          name = cheerioElem.text(),
          url = cheerioElem.attr('href'),
          title = cheerioElem.attr('title'),
          obj = { name, url, title };

    res.push(obj)
  });

  return res;
};


export default data;