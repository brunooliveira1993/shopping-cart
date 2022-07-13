const saveCartItem = (item) => localStorage.setItem('cartItems', item);

// console.log(saveCartItemsComplet());

if (typeof module !== 'undefined') {
  module.exports = saveCartItem;
}