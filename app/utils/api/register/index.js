const actions = {};

actions.formData = (data) => {
  return Object.keys(data).map(item => (
    `${encodeURIComponent(item)}=${encodeURIComponent(data[item])}`
  )).join('&');
};

export default actions;