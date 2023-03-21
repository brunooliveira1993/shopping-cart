const saveCartItem = (item) => localStorage.setItem('cartItems', item);

if (typeof module !== 'undefined') {
  module.exports = saveCartItem;
}