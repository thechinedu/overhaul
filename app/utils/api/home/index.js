const data = {};

const fetchFeaturedLinks = (rootSelector, elemStr) => {
  const featured = Array.from(rootSelector(elemStr)),
        res = [];

  featured.forEach( elem => {
    const cheerioElem = rootSelector(elem),
          text = cheerioElem.text(),
          url = cheerioElem.attr('href'),
          obj = { text, url };

    res.push(obj);
  });

  return res;
};

data.oldFeaturedLinks = (doc) => {
  return fetchFeaturedLinks(doc, 'table[summary=links] a');
};

data.currentFeaturedLinks = (doc) => {
  const result = fetchFeaturedLinks(doc, '.boards .featured a');

  return result.splice(0, result.length - 1);
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

data.lastPage = (doc) => (
  parseInt(doc('.body > p:nth-of-type(3) b:last-of-type').text())
);


export default data;