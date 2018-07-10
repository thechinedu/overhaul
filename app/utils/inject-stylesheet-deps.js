import tag from './tag';

const injectStylesheetDeps = () => {
  const head = document.head;
  const fontAwesome = document.createElement('link');
  const normalize = document.createElement('link');

  addAttrs([
    {
      element: fontAwesome,
      src: tag`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/
               font-awesome.min.css`,
    },
    {
      element: normalize,
      src: tag`https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/
               normalize.min.css`
    }
  ]);

  head.insertAdjacentElement('afterbegin', fontAwesome);
  head.insertAdjacentElement('afterbegin', normalize);
};

const addAttrs = (arr) => {
  arr.forEach(obj => {
    const { element, src } = obj;
    element.href = src;
    element.type = 'text/css';
    element.rel = 'stylesheet';
  });
};

export default injectStylesheetDeps;
