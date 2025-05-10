import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { renderCheckoutHeader } from "../../scripts/checkout/checkoutHeader.js";
import {cart} from '../../data/cart-class.js';
import { loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll(async() => {
    await loadProductsFetch();
  });

  beforeEach(() => {
    //Create a mock of localStorage setItem() to avoid saving the items used for testing in the localStorage
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container')
    .innerHTML = `
    <div class="js-checkout-header"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;

    //Create a mock of localStorage getItem() to work with specific values and not values in the localStorage
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

    renderCheckoutHeader();
    renderOrderSummary();
  })

  afterEach(() => {
    document.querySelector('.js-test-container')
    .innerHTML = ``;
  })

  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual('$10.90');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  it('updates the delivery option', () => {
    document.querySelector(`.js-product-id-${productId1}-delivery-option-id-${(cart.cartItems[0].deliveryOptionId = '3')}`).click();
    expect(
      document.querySelector(`.js-input-product-id-${productId1}-delivery-option-id-${(cart.cartItems[0].deliveryOptionId = '3')}`).checked
    ).toEqual(true);
    expect(
      cart.cartItems.length
    ).toEqual(2);
    expect(
      cart.cartItems[0]
    ).toEqual(
      {
        productId: productId1, 
        quantity: 2, 
        deliveryOptionId: '3'
      });
    expect(
      document.querySelector('.js-shipping-price').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-total-payment').innerText
    ).toEqual('$63.50');
  })
})