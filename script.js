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

const cartItemClickListener = (event) => {
  const item = event.target;
  console.log(item);
  container.removeChild(item);
  // arrLi.splice(arrLi.indexOf(item));
  // saveCartItems(arrLi);
};

// const createArr = (param) => {
//   const itemAddList = param.innerHTML;
//   arrLi.push(`${itemAddList};`);
// };

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  // createArr(li);
  // saveCartItems(arrLi);
  return li;
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

const addIntemInCart = () => {
  button.forEach((element) => {
    const elemento = element.lastChild;
    elemento.addEventListener('click', async function (e) {
      // const container = document.querySelector('#cart_item');
      const selectedItem = e.path[1].firstChild.innerText;
      const objSelect = await fetchItem(selectedItem);
      const objReturn = {
        sku: objSelect.id,
        name: objSelect.title,
        salePrice: objSelect.price,
      };
      saveCartItemsComplet(objReturn);
      container.appendChild(createCartItemElement(objReturn));
      return container;
    });
  });
};

window.onload = async () => {
  await createListFunct('computador');
  addIntemInCart();
  const itensInStorage = getSavedCartItems('cartItems');
  const objParam = JSON.parse(itensInStorage);
  if (localStorage.length === 0) {
    console.log('ok');
  } else {
    objParam.forEach((element) => container.appendChild(createCartItemElement(element)));
    console.log('ola');
  }
  console.log(objParam);
};