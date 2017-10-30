const threadDetails = {};

threadDetails.fetchOwnerDetails = (url) => {
  return fetch(url).then( res => {
    return res.text().then( data => {
      return data;
    });
  });
};

export default threadDetails;