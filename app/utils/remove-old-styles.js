const removeOldStyles = () => {
  let stylesheets = Array.from(document.querySelectorAll('link[href*=css]'));

  stylesheets.forEach( stylesheet => stylesheet.remove() );
};

export default removeOldStyles;
