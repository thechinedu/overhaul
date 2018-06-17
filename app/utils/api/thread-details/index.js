import cheerio from 'cheerio';
import lastPageCount from 'utils/get-last-page-count';
import auth  from 'utils/auth';
import { fetchPlaceholderImage, fetchAuthImage } from 'utils/fetch-image';

const threadDetails = {};

threadDetails.fetchOwnerDetails = (url) => {
  return fetch(url).then( res => {
    return res.text().then( html => {
      return html;
    });
  });
};

threadDetails.fetchOwnerImage = async (currentUser, moniker) => {
  if (auth.userSignedIn(currentUser)) {
    const res = await fetchAuthImage(currentUser, moniker);

    return res;
  } else {
    return fetchPlaceholderImage(moniker);
  }
};

threadDetails.fetchTotalCommentCount = (url) => {
  return fetch(url).then(res => {
    return res.text().then(html => {
      const doc = cheerio.load(html),
        pageCount = lastPageCount(doc),
        path = new URL(url).pathname;

      if (pageCount === 0) return doc('.narrow').length;

      return countComments(`${path}/${pageCount}`, pageCount).then(count => {
        return count;
      });
    });
  });
};

const countComments = (url, pageCount) => {
  const commentsPerPage = 32;

  return fetch(url).then(res => {
    return res.text().then(html => {
      const doc = cheerio.load(html),
        commentCount = doc('.narrow').length;

      return (commentsPerPage * pageCount) + commentCount;
    });
  });
};

export default threadDetails;
