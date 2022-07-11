// const fetch = require('node-fetch');

const fetchProducts = async (search) => {
  // if (search === undefined) throw new Error('You must provide an url');
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const require = await fetch(url);
    const response = await require.json();
    // console.log(response);
    return response;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
