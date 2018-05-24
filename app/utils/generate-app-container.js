import removeOldStyles from 'utils/remove-old-styles';
import injectAlertMessage from 'utils/inject-alert-message';

const generateNewApplicationContainer = ({container, renderer, ignoredRoutes}) => {
  let body = document.querySelector('body'),
      div = document.createElement('div');

  if (ignoredRoutes.includes(location.pathname)) {
    body.style.display = 'block';
    injectAlertMessage({
      message: 'Why am I seeing the old design on this page?',
      nodeType: 'p',
      container: body
    })
    return;
  }

  body.innerHTML = '';
  div.id = 'app';

  body.append(div);
  body.style.display = 'block';

  removeOldStyles();
  renderer(container, document.querySelector('#app'));
}

export default generateNewApplicationContainer;
