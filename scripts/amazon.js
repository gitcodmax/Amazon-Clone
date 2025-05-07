import { cart } from "../data/cart-class.js";
import { products } from "../data/products.js";

updateCartQuantity();

let productsHTML = '';

//Loops through the products array generating the HTML for the products
products.forEach((product) => {
  productsHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
})

//To display the products in the amazon home page
document.querySelector('.js-products-grid')
.innerHTML = productsHTML;

//Update the quantity of items in the cart
function updateCartQuantity(){
  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantity;
}

//This function enables the Added notification to disappear after two seconds
let setTimeoutId;
function setAddedTimer(productId){
  const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedToCartElement.classList.add('added-to-cart-visible');

  clearTimeout(setTimeoutId);

  setTimeoutId = setTimeout(() => {
    addedToCartElement.classList.remove('added-to-cart-visible');
  }, 2000);
}

//Adding a product to the cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((buttonElement) => {
    buttonElement.addEventListener('click', () => {
      const productId = buttonElement.dataset.productId;
        //Getting the quantity of items to add from the select tag
        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`)
        .value);
      cart.addToCart(productId, quantity);
      updateCartQuantity();
      setAddedTimer(productId);
    })
  })
