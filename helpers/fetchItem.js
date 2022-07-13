// const fetch = require('node-fetch');

const fetchItem = async (element) => {
  try {
    const url = `https://api.mercadolibre.com/items/${element}`;
    const require = await fetch(url);
    const response = await require.json();
    return response;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
