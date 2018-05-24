import swal from 'sweetalert';

const injectAlertMessage = ({container, nodeType, message}) => {
  const elem = document.createElement(nodeType);
  elem.append(document.createTextNode(message));
  elem.style.cursor = 'pointer';
  elem.style.fontStyle = 'italic';
  
  container.insertAdjacentElement('afterbegin', elem);
  showInfoOnClick(elem);
};

const showInfoOnClick = (elem) => {
  elem.addEventListener('click', () => {
    swal('😢😢 Unfortunately, some pages of the site could not be reskinned\
    while retaining existing functionality, this is one of such pages. Hopefully\
    this will be resolved in a future update.');
  });
}

export default injectAlertMessage;