const lastPageCount = (doc) => {
  let res = Array.from(doc('.clientimages + p a'));

  res = res.filter(item => {
    return doc(item).text().match(/\(\d+\)/);
  });

  if ( res.length === 0 ) return 0;

  res = parseInt(doc(res.pop()).text().replace(/[()]/g, ''));

  return res;
};

export default lastPageCount;