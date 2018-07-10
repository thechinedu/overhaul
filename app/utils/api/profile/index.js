const data = {};

const getUserName = doc => doc('#up ~ h2').text().replace('\'s Profile', '');

const getProfileImage = doc => doc('img[src*=avatars]').attr('src');

const getProfileMetadata = doc => {
  const validMetadataInfo = [
    'Personal text', 'Gender', 'Time registered', 'Time spent online',
    'Signature', 'Last seen', 'Sections Most Active In'
  ];
  const metadataElems = Array.from(doc('table:nth-of-type(3) td > p'));
  let elemStr = '';

  metadataElems.forEach(node => {
    let nodeText = doc(node).text();

    if ( validMetadataInfo.find(info => nodeText.includes(info)) ) {
      elemStr += doc.html(node);
    }
  });

  return elemStr;
};

const getTopicList = doc => {
  const container = Array.from(doc('table:nth-of-type(2) td'));
  const res = [];

  container.forEach(node => {
    const elem = doc(node),
      text = elem.find('b:nth-of-type(2) > a').text(),
      url = elem.find('b:nth-of-type(2) > a').attr('href'),
      ownerName = elem.find('.s > b:first-of-type').text(),
      section = elem.find('> b:nth-of-type(1)').text(),
      commentCount = elem.find('.s > b:nth-of-type(2)').text();

    res.push({ text, url, ownerName, section, commentCount });
  });

  return res;
};

const getFollowingList = doc => (
  Array.from(doc('table[summary=friends] .user a')).map(node =>
    doc(node).text()
  )
);

data.init = (doc) => ({
  userName: getUserName(doc),
  profileImage: getProfileImage(doc),
  profileMetadata: getProfileMetadata(doc),
  topicList: getTopicList(doc),
  followingList: getFollowingList(doc)
});

export default data;
