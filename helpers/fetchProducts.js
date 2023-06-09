const fetchProducts = async (search) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const require = await fetch(url);
    const response = await require.json();
    const itemFilter = response.results;
    // console.log(itemFilter);
    return itemFilter;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
