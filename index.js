const items = [
  {
      id: "001-beetroot",
      name: "beetroot",
      price: 1.80,
      image: "assets/icons/001-beetroot.svg"
  },
  {
      id: "002-carrot",
      name: "carrot",
      price: 0.40,
      image: "assets/icons/002-carrot.svg"
  },
  {
      id: "003-apple",
      name: "apple",
      price: 0.62,
      image: "assets/icons/003-apple.svg"
  },
  {
      id: "004-apricot",
      name: "apricot",
      price: 1.75,
      image: "assets/icons/004-apricot.svg"
  },
  {
      id: "005-avocado",
      name: "avocado",
      price: 0.75,
      image: "assets/icons/005-avocado.svg"
  },
  {
      id: "006-bananas",
      name: "bananas",
      price: 0.64,
      image: "assets/icons/006-bananas.svg"
  },
  {
      id: "007-bell-pepper",
      name: "bell-pepper",
      price: 0.45,
      image: "assets/icons/007-bell-pepper.svg"
  },
  {
      id: "008-berry",
      name: "berry",
      price: 2.00,
      image: "assets/icons/008-berry.svg"
  },
  {
      id: "009-blueberry",
      name: "blueberry",
      price: 2.00,
      image: "assets/icons/009-blueberry.svg"
  },
  {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.69,
      image: "assets/icons/010-eggplant.svg"
  }
];

//initialise state

function buildState () {
  for (i = 0; i < items.length; i++) {
    let qty = {'qty': 0};
    state.push(Object.assign(qty, items[i]));
  }
  return state;
}

var state = []
state = buildState();
console.log (state);

//define variables & functions to create new HTML elements

const storeItems = document.querySelector('.store--item-list');
const cartItems = document.querySelector('.cart--item-list');

function createNewElement(element = '') {
  const newElement = document.createElement(element);
  return newElement;
}

function appendToParent(element, parentElement) {
  return parentElement.append(element);
}

//store

function createDivImageContainer () {
  const divImgContainer = createNewElement('div');
  divImgContainer.className = 'store--item-icon';
  return divImgContainer;
}

function createCartItemImage(a) {
  const itemImage = createNewElement('img');
  itemImage.setAttribute("src", items[a].image );
  itemImage.setAttribute("alt", items[a].name );
  return itemImage;
}

function createItemButton () {
  const itemButton = createNewElement('button');
  itemButton.innerText = 'Add to cart';
  return itemButton;
}

function createStore (item) {
  const listItem = createNewElement('li');
  appendToParent (listItem, storeItems);

  const DivImageContainer = createDivImageContainer ();
  appendToParent (DivImageContainer, listItem);

  const listItemImage = createCartItemImage(item);
  appendToParent (listItemImage, DivImageContainer);

  const cartButton = createItemButton();
  let cartButtonItemId = items[item].id
  cartButtonItemId = cartButtonItemId.replace(/\D/g,'');
  cartButton.id = cartButtonItemId
  appendToParent (cartButton, listItem);
}

//initialise store

  for (i = 0; i < items.length; i++) {
    createStore(i);
  }

//cart

function createItemImage(a) {
  const itemImage = createNewElement('img');
  itemImage.setAttribute("src", state[a].image );
  itemImage.setAttribute("alt", state[a].name );
  itemImage.className = "cart--item-icon";
  return itemImage;
}

function createItemName(a) {
  const itemName = createNewElement('p');
  itemName.innerText = state[a].name;
  console.log (state[a])
  return itemName;
}

function createButtonMinus(a) {
  const buttonMinus = createNewElement('button');
  let createbuttonMinusId = state[a].id
  createbuttonMinusId = createbuttonMinusId.replace(/\D/g,'');
  buttonMinus.id = createbuttonMinusId
  buttonMinus.className = 'quantity-btn remove-btn center';
  buttonMinus.innerText = '-';
  return buttonMinus
}

function createItemQty(a) {
  const itemQty = createNewElement('span');
  itemQty.className = 'quantity-text center';
  itemQty.innerText = state[a].qty
  return itemQty;
}

function createButtonPlus(a) {
  const buttonPlus = createNewElement('button');  
  let createButtonPlusId = state[a].id
  createButtonPlusId = createButtonPlusId.replace(/\D/g,'');
  buttonPlus.id = createButtonPlusId
  buttonPlus.className = 'quantity-btn add-btn center';
  buttonPlus.innerText = '+';
  return buttonPlus;
}

// calculate cost of items in cart

function price() {
  runningTotal=0;
  for (i = 0; i < state.length; i++) {
  let lineTotal = state[i].qty*state[i].price;
  runningTotal = runningTotal+lineTotal
  }
  let cartTotal = 0
  cartTotal = runningTotal.toFixed(2)
  const price = document.querySelector('.total-number')
  price.innerText = '£'+cartTotal
  }

// create cart

function updateCart (item) {
  if (state[item].qty > 0) {
    const listItem = createNewElement('li');
    listItem.className = state[item].id
    console.log(listItem.classList)
    appendToParent (listItem, cartItems);

    const listItemImage = createItemImage(item);
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

//event listeners - store

const storeItemClick = document.querySelector('.store--item-list');
storeItemClick.addEventListener("click", function (event) {
  let newId = Number(event.target.id - 1);
  let button = event.target.closest('button');
  if (!button) return;
  state[newId].qty ++;
  cartItems.innerHTML = '';
  for (i = 0; i < state.length; i++) {
  updateCart(i);
  }
  price()
})

//event listeners - cart

const cartItemClick = document.querySelector('.cart--item-list');
cartItemClick.addEventListener("click", function (event) {
  let newId = Number(event.target.id - 1);
  let buttonPlus = event.target.closest('.add-btn');
  let buttonMinus = event.target.closest('.remove-btn');
  if (!buttonPlus && !buttonMinus) return;
  if (!buttonPlus) {
    state[newId].qty --;
    cartItems.innerHTML = '';
    for (i = 0; i < state.length; i++) {
    updateCart(i);
    }
    price()
  } else {
    state[newId].qty ++;
    cartItems.innerHTML = '';
    for (i = 0; i < state.length; i++) {
    updateCart(i);
    }
    price()
  }
})