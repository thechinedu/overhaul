const blank = (str) => str.length === 0 || !!str.match(/^\s+$/g);

const auth = {
  userSignedIn: (username) => {
    return blank(username) ? false : true;
  }
};

export default auth;
