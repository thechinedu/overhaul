const lastPageCount = ($) => {
  let res = Array.from($('#up ~ p > b'));

  res = res.filter(item => $(item).text().match(/^\d+$/));

  if ( res.length === 0 ) {
    res = Array.from($('.clientimages + p a'));
    res = res.filter( item => $(item).text().match(/\(\d+\)/) );

    return res.length ? parseInt($(res.pop()).text().replace(/\W+/g, '')) : 0;
  }

  res = parseInt($(res.pop()).text());

  return (res - 1);
};

export default lastPageCount;