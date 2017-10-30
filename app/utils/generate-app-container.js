const generateNewApplicationContainer = () => {
  let body = document.querySelector('body'),
      div = document.createElement('div');

  body.innerHTML = '';
  div.id = 'app';

  body.append(div);
  body.style.display = 'block';
}

export default generateNewApplicationContainer;

