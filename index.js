let state = []
const storeItems = document.querySelector('.store--item-list');
const cartItems = document.querySelector('.cart--item-list');
const header = document.querySelector('#store')

//setup state array  = data array with item qtys

function buildState () {
  for (i = 0; i < items.length; i++) {
    let qty = {'qty': 0};
    state.push(Object.assign(qty, items[i]));
  }
  return state;
}

function initState () {
  state = buildState();
}

//create HTML elements

function createNewElement(element = '') {
  const newElement = document.createElement(element);
  return newElement;
}

function appendToParent(element, parentElement) {
  return parentElement.append(element);
}

//remove non-numerical elements from item-id in state array

function assignNumericalId(a) {
  let itemId = state[a].id;
  itemId = itemId.replace(/\D/g,'');
  return itemId;
}

//store specific functions

function createDivImageContainer () {
  const divImgContainer = createNewElement('div');
  divImgContainer.className = 'store--item-icon';
  return divImgContainer;
}

function createItemImage(a) {
  const itemImage = createNewElement('img');
  itemImage.setAttribute("src", `assets/icons/${items[a].id}.svg`);
  itemImage.setAttribute("alt", items[a].name);
  return itemImage;
}

function createItemButton () {
  const itemButton = createNewElement('button');
  itemButton.innerText = 'Add to cart';
  return itemButton;
}

//build store HTML elements

function createStore (item) {
  const listItem = createNewElement('li');
  appendToParent (listItem, storeItems);

  const DivImageContainer = createDivImageContainer ();
  appendToParent (DivImageContainer, listItem);

  const listItemImage = createItemImage(item);
  appendToParent (listItemImage, DivImageContainer);

  const cartButton = createItemButton();
  cartButton.id = assignNumericalId(item);
  appendToParent (cartButton, listItem);
}

function initStore(value) {
  storeItems.innerHTML = '';
  for (i = 0; i < state.length; i++) {
    if (state[i].type === value || value === 'all') {
    createStore(i);
    }
  }
}

//cart specific functions

function createItemName(a) {
  const itemName = createNewElement('p');
  itemName.innerText = state[a].name;
  return itemName;
}

function createButtonMinus(a) {
  const buttonMinus = createNewElement('button');
  buttonMinus.id = assignNumericalId(a);
  buttonMinus.className = 'quantity-btn remove-btn center';
  buttonMinus.innerText = '-';
  return buttonMinus;
}

function createItemQty(a) {
  const itemQty = createNewElement('span');
  itemQty.className = 'quantity-text center';
  itemQty.innerText = state[a].qty;
  return itemQty;
}

function createButtonPlus(a) {
  const buttonPlus = createNewElement('button');  
  buttonPlus.id = assignNumericalId(a);
  buttonPlus.className = 'quantity-btn add-btn center';
  buttonPlus.innerText = '+';
  return buttonPlus;
}

//build cart HTML elements

function updateCart(item) {
  if (state[item].qty > 0) {
    const listItem = createNewElement('li');
    listItem.className = state[item].id;
    appendToParent (listItem, cartItems);

    const listItemImage = createItemImage(item);
    listItemImage.className = "cart--item-icon";
    appendToParent (listItemImage, listItem);

    const listItemName = createItemName(item);
    appendToParent (listItemName, listItem);

    const listbuttonMinus = createButtonMinus (item);
    appendToParent (listbuttonMinus, listItem);

    const listItemQty = createItemQty (item);
    appendToParent (listItemQty, listItem);

    const listButtonPlus = createButtonPlus (item);
    appendToParent (listButtonPlus, listItem);
  }
}

//calculate cost of items

function cartTotal() {
  let runningTotal = 0;
    for (i = 0; i < state.length; i++) {
    let lineTotal = state[i].qty*state[i].price;
    runningTotal = runningTotal+lineTotal;
    }
    let cartTotal = runningTotal.toFixed(2);
    const cost = document.querySelector('.total-number');
    cost.innerText = '£'+cartTotal;
  }

function generateNewcart() {
  cartItems.innerHTML = '';
  for (i = 0; i < state.length; i++) {
  updateCart(i);
  }
  cartTotal();
}

//form specific functions

function createNewFormOption (value, text) {
  const optionname = createNewElement('option');
  optionname.value = value;
  optionname.innerText = text;
  return optionname;
}

//challenge 1 - form

function generateForm() {
  const form = createNewElement('form');
  form.className = ('form');
  header.insertBefore(form, storeItems);
  const select = createNewElement('select');
  appendToParent (select, form);
  const defaultOption = createNewFormOption ('', 'Filter By ...');
  appendToParent (defaultOption, select);
  const option = createNewFormOption ('all', 'All items');
  appendToParent (option, select);
  const option2 = createNewFormOption ('fruit', 'Fruits');
  appendToParent (option2, select);
  const option3 = createNewFormOption ('vegetable', 'Vegetables');
  appendToParent (option3, select);
}

//initialise state array, form and store items on first page load

initState();
generateForm();
initStore('all');

//eventListeners

storeItems.addEventListener("click", function (event) {
  let newId = Number(event.target.id - 1);
  let button = event.target.closest('button');
  if (!button) return;
  state[newId].qty ++;
  generateNewcart();
})

cartItems.addEventListener("click", function (event) {
  let newId = Number(event.target.id - 1);
  let buttonPlus = event.target.closest('.add-btn');
  let buttonMinus = event.target.closest('.remove-btn');
  if (!buttonPlus && !buttonMinus) return;
  (buttonPlus ? state[newId].qty ++ : state[newId].qty --);
  generateNewcart();
})

const formClick = document.querySelector('.form');
formClick.addEventListener('change', function(event) {
    event.preventDefault();
    let value = event.target.value;
    if (value === 'fruit') initStore('fruit');
    if (value === 'vegetable') initStore('vegetable');
    if (value === 'all') initStore('all');
})