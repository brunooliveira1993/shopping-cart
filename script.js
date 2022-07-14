const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const saveCartItemsComplet = (item) => {
  const locaStorageElement = localStorage.getItem('cartItems');
  if (locaStorageElement === null) {
    localStorage.setItem('cartItems', JSON.stringify([item]));
  } else {
    const objectsLocalStorage = JSON.parse(locaStorageElement);
    localStorage.setItem('cartItems', JSON.stringify([...objectsLocalStorage, item]));
  }
};

const container = document.querySelector('#cart_item');

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const priceSubtrai = (element) => {
  const parceResult = JSON.parse(localStorage.getItem('totalPrice'));
  const subResult = parceResult - element;
  localStorage.setItem('totalPrice', subResult);
  document.querySelector('#price').innerHTML = subResult;
};

const cartItemClickListener = (event) => {
  const item = event.target;
  const itemValue = item.innerText.split('$')[1];
  container.removeChild(item);
  priceSubtrai(itemValue);
};

const objArray = async (element) => {
  const arr = [];
  const obj = await fetchProducts(element);
  obj.forEach((element2) => {
    const newObj = {
      sku: element2.id,
      name: element2.title,
      image: element2.thumbnail,
    };
    arr.push(newObj);
  });
  return arr;
};

const createListFunct = async (element) => {
  const container2 = document.querySelector('.items');
  const result = await objArray(element);
  result.forEach((variable) => {
    container2.appendChild(createProductItemElement(variable));
  });
  return container2;
};

const section = document.getElementsByClassName('items');
const button = section[0].childNodes;

const priceSoma = (element) => {
  let total = 0;
  let resercheNumber = 0;
  if (localStorage.length === 0) {
    total = 0;
  } else {
    total = localStorage.getItem('totalPrice');
    resercheNumber += JSON.parse(total);
  }
  const result = resercheNumber + element;
  localStorage.setItem('totalPrice', result);
};

const totalPrice = (element) => {
  const priceLocal = document.querySelector('#price');
  // const intNumber = parseInt(element);
  priceLocal.innerHTML = element;
  return priceLocal;
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const totalPriceResurge = localStorage.getItem('totalPrice');
  totalPrice(totalPriceResurge);
  return li;
};

const addIntemInCart = () => {
  button.forEach((element) => {
    const elemento = element.lastChild;
    elemento.addEventListener('click', async function (e) {
      const selectedItem = e.path[1].firstChild.innerText;
      const objSelect = await fetchItem(selectedItem);
      const objReturn = {
        sku: objSelect.id,
        name: objSelect.title,
        salePrice: objSelect.price,
      };
      saveCartItemsComplet(objReturn);
      const objPrice = objReturn.salePrice;
      priceSoma(objPrice);
      container.appendChild(createCartItemElement(objReturn));
      return container;
    });
  });
};

const emptyButton = document.querySelector('.empty-cart');

emptyButton.addEventListener('click', () => {
  localStorage.clear();
  const arrLi = document.getElementsByClassName('cart__items')[0].children;
  const arrLi2 = [...arrLi];
  console.log(arrLi);
  arrLi2.forEach((element) => {
    element.remove();
  });
  totalPrice(0);
});

const hideLoading = () => {
  const load = document.querySelector('.loading');
  load.remove();
};

const showloading = () => {
  console.log('ok');
  const div = document.createElement('div');
  div.classList.add('loading');
  document.body.appendChild(div);
  const label = document.createElement('label');
  label.innerText = 'Carregando...';
  div.appendChild(label);
};

window.onload = async () => {
  showloading();
  await createListFunct('computador');
  hideLoading();
  addIntemInCart();
  document.querySelector('#price').innerHTML = localStorage.getItem('totalPrice');
  const itensInStorage = getSavedCartItems('cartItems');
  const objParam = JSON.parse(itensInStorage);
  if (localStorage.length === 0) {
    console.log('ok');
  } else {
    objParam.forEach((element) => container.appendChild(createCartItemElement(element)));
    console.log('ola');
  }
};