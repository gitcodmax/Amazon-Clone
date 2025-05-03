export const cart = [];

//Adding an item to the cart
export function addToCart(productId){
  //Getting the quantity of items to add from the select tag
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`)
  .value);

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
  cart.push({productId, quantity});
  }
}