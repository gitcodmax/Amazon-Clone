export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
      quantity: 2, 
      deliveryOptionId: '1'
    }, 
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
      quantity: 1, 
      deliveryOptionId: '2'
    }
  ];
}
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

//Adding an item to the cart
export function addToCart(productId, quantity){

  //Check if item is in the cart already
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
  cart.push(
    {
      productId: productId, 
      quantity: quantity,
      deliveryOptionId: '1'
    }
  )
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })

  cart = newCart;
  saveToStorage()
}

export function calculateCartQuantity(){
  //Finding the amount of items in the cart
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  })

  saveToStorage();
}

//Updates the delivery option in the cart when called
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}