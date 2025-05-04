import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
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
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${matchingProduct.id}>
            Update
          </span>

          <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingProduct.id}>Save</span>
        
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
});

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
      updateCartQuantity();
      
      const container = getContainer(productId);
      container.remove();
    })
  })

//Update the quantity of items in the checkout header
function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}

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
    updateCartQuantity();
    
    getContainer(productId).classList.remove('is-editing-quantity');
  }
}