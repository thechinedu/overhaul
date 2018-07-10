const blank = (str) => str.length === 0 || !!str.match(/^\s+$/g);

const auth = {
  userSignedIn (username) {
    return blank(username) ? false : true;
  },

  getSessionId(doc) {
    return doc('.grad')
      .eq(0)
      .find('> a:last-of-type')
      .attr('href')
      .split('&session=')[1]
  }
};

export default auth;
