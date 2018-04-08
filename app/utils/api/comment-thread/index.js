const data = {};

data.commentThreadTitle = (doc) => {
  const title = doc('.body > h2 + .bold a:nth-of-type(4)').text();
  return title;
};

data.comments = (doc) => {
  const users = Array.from(doc('table[summary=posts] .user')).map( elem => doc(elem).text() ),
        timestamps = Array.from(doc('table[summary=posts] .user ~ .s')),
        commentBodies = Array.from(doc('table[summary=posts] .narrow')),
        res = [];

  commentBodies.forEach( (elem, index) => {
    const userName = users[index],
          createdAt = doc(timestamps[index]).text(),
          commentBody = doc(elem).html();

    res.push({ userName, createdAt, commentBody });
  });

  return res;
};

export default data;

// [
//  {
//    userName: 'damilare',
//    gender: 'm|f|null',
//    createdAt: '10:29pm on Aug 06',
//    commentBody: 'lorem ipsum....', // Will be saved as an html string
//
//  }
// ]