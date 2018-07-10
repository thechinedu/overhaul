import removeOldStyles from './remove-old-styles';
import injectStylesheetDeps from './inject-stylesheet-deps';
import injectAlertMessage from './inject-alert-message';

const generateNewApplicationContainer = ({container, renderer, notImplementedRoutes}) => {
  let body = document.querySelector('body'),
    div = document.createElement('div');

  if (notImplementedRoutes.includes(location.pathname)) {
    body.style.display = 'block';
    injectAlertMessage({
      message: 'Why am I seeing the old design on this page?',
      nodeType: 'p',
      container: body
    });

    return;
  }

  body.innerHTML = '';
  div.id = 'app';

  body.append(div);
  body.style.display = 'block';

  removeOldStyles();
  injectStylesheetDeps();
  renderer(container, document.querySelector('#app'));
};

export default generateNewApplicationContainer;
