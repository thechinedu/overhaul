const tag = (templates) => {
  const template = templates[0];

  return template.replace(/[\n\s{2,}]/g, '');
};

export default tag;
