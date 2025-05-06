import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

//This function maintains the checkout page
export function renderOrderSummary(){
  renderCheckoutHeader();

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${matchingProduct.id}>
              Update
            </span>

            <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingProduct.id}>Save</span>
          
            <span class="delete-quantity-link link-primary js-delete-link  js-delete-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
          
        </div>
      </div>
    </div>
    `
  });

  //Set the html for the delivery options
  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  //Get the cart container
  function getContainer(productId){
    return document.querySelector(`.js-cart-item-container-${productId}`);
  }

  //Setting the Delete link(button)
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })

  //Setting the Update link(button)
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((updateLink) => {
      updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId;

        const container = getContainer(productId);
        container.classList.add('is-editing-quantity');

        const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
        inputElement.addEventListener('keydown', (event) => {
          if(event.key === 'Enter'){
            handleQuantityInput(inputElement, productId);
            renderPaymentSummary();
            renderOrderSummary();
          }
        })
      })
    })

  //Setting the save link(button)
  document.querySelectorAll('.js-save-quantity-link')
    .forEach((saveLink) => {
      saveLink.addEventListener('click', () => {
        const productId = saveLink.dataset.productId;

        const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
        handleQuantityInput(inputElement, productId);
        renderPaymentSummary();
        renderOrderSummary();
      })
    })

  //This function updates the quantity of each item and the whole cart.
  //It is used when you click the update link(button) and the save link(button)
  function handleQuantityInput(inputElement, productId){
    const itemQuantity = Number(inputElement.value);

    if(itemQuantity <= 0 || itemQuantity > 1000){
      alert("The item quantity should be greater than 0 and not more than 1000");
    } else{
      updateQuantity(productId, itemQuantity);
      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = itemQuantity;
      
      getContainer(productId).classList.remove('is-editing-quantity');
    }
  }

  //Set the delivery option button
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();//Regenerate the HTML with the right delivery option
        renderPaymentSummary();
      })
    })
}
