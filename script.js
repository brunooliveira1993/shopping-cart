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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const container = document.querySelector('#cart_item');
  const item = event.target;
  container.removeChild(item);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
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
  const container = document.querySelector('.items');
  const result = await objArray(element);
  result.forEach((variable) => {
    container.appendChild(createProductItemElement(variable));
  });
  return container;
};

document.addEventListener('click', async function (e) {
  const container = document.querySelector('#cart_item');
  const selectedItem = e.path[1].firstChild.innerText;
  const objSelect = await fetchItem(selectedItem);
  const objReturn = {
    sku: objSelect.id,
    name: objSelect.title,
    salePrice: objSelect.price,
  };
  container.appendChild(createCartItemElement(objReturn));
  return container;
});

window.onload = async () => {
  await createListFunct('computador');
};