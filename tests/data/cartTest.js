//import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  })

  it('adds an existing product to the cart', () => {
    cart.cartItems = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 2,
        deliveryOptionId: '1'
      }
    ]

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(4);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 4,
        deliveryOptionId: '1'
      }
    ]));
  });

  it('adds a new product to the cart', () => {
    cart.cartItems = [];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        quantity: 2,
        deliveryOptionId: '1'
      }
    ]));
  });
})

describe('remove a product from the cart', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    cart.cartItems = [
      {
        productId: productId1, 
        quantity: 2, 
        deliveryOptionId: '1'
      }, 
      {
        productId: productId2, 
        quantity: 1, 
        deliveryOptionId: '2'
      }
    ]
  })

  it('removes a product in the cart', () => {
    cart.removeFromCart(productId1);
    expect(
      cart.cartItems.length
    ).toEqual(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart-oop', JSON.stringify([
      {
      productId: productId2, 
      quantity: 1, 
      deliveryOptionId: '2'
      }
      ])
    )
  })
  it('test suite: removes a product that is not in the cart', () => {
    cart.removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(
      cart.cartItems.length
    ).toEqual(2);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart-oop', JSON.stringify([
      {
        productId: productId1, 
        quantity: 2, 
        deliveryOptionId: '1'
      }, 
      {
        productId: productId2, 
        quantity: 1, 
        deliveryOptionId: '2'
      }
      ])
    )
  })
})

describe('test suite: updateDeliveryOption', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    cart.cartItems = [
      {
        productId: productId1, 
        quantity: 2, 
        deliveryOptionId: '1'
      }
    ]
  })

  it('updates the delivery option of a cart', () => {
    cart.updateDeliveryOption(productId1, '2');
    expect(
      cart.cartItems[0].deliveryOptionId
    ).toEqual('2');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
  })

  it('does not update the delivery option of an item not in the cart', () => {
    cart.updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '2');
    expect(
      cart.cartItems.length
    ).toEqual(1);
    expect(
      cart.cartItems[0].productId
    ).toEqual(productId1);
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(0);
  })

  it('using a deliveryOptionId that does not exist', () => {
    cart.updateDeliveryOption(productId1, '5');
    expect(
      cart.cartItems[0].productId
    ).toEqual(productId1);
    expect(
      cart.cartItems[0].deliveryOptionId
    ).toEqual('1');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledTimes(0);
  })
})