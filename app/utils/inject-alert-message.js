import swal from 'sweetalert';

const injectAlertMessage = ({container, nodeType, message}) => {
  const elem = document.createElement(nodeType);
  elem.append(document.createTextNode(message));
  elem.style.cursor = 'pointer';
  elem.style.backgroundColor = '#1b541c';
  elem.style.fontSize = '18px';
  elem.style.width = '50%';
  elem.style.margin = '0 auto';
  elem.style.color = '#fff';
  elem.style.padding = '10px 15px';

  container.insertAdjacentElement('afterbegin', elem);
  showInfoOnClick(elem);
};

const showInfoOnClick = (elem) => {
  elem.addEventListener('click', () => {
    swal('😢😢 Unfortunately, some pages of the site could not be reskinned\
    while retaining existing functionality, this is one of such pages. Hopefully\
    this will be resolved in a future update.');
  });
};

export default injectAlertMessage;
