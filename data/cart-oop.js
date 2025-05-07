import { getDeliveryOption } from "./deliveryOptions.js";

//Generate a new cart object
function Cart(localStorageKey){
  const cart = {
    cartItems: undefined, 
  
    loadFromStorage(){//Shorthand for loadFromStorage : function(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if(!this.cartItems){
        this.cartItems = [
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
    }, 
    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    //Adding an item to the cart
    addToCart(productId, quantity){
  
      //Check if item is in the cart already
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
  
      if(matchingItem){
        matchingItem.quantity += quantity;
      }else{
      this.cartItems.push(
        {
          productId: productId, 
          quantity: quantity,
          deliveryOptionId: '1'
        }
      )
      }
  
      this.saveToStorage();
    }, 
  
    removeFromCart(productId){
      const newCart = [];
  
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      })
  
      this.cartItems = newCart;
      this.saveToStorage()
    }, 
  
    calculateCartQuantity(){
      //Finding the amount of items in the cart
      let cartQuantity = 0;
  
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
  
      return cartQuantity;
    }, 
  
    updateQuantity(productId, newQuantity){
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId){
          cartItem.quantity = newQuantity;
        }
      })
    
      this.saveToStorage();
    }, 
  
    //Updates the delivery option in the cart when called
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
  
      const deliveryOption = getDeliveryOption(deliveryOptionId);
  
      if(!deliveryOption){
        return;
      }
  
      if(!matchingItem){
        return;
      }
  
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  };//End of object cart

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);