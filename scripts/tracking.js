import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderAmazonHeaderHTML } from "./amazonHeader.js";

const url = new URL(window.location.href);

const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
renderAmazonHeaderHTML();

async function renderTrackingPage(){
  await loadProductsFetch();
  let productQuantity;
  let productDeliveryTime;
  let orderTime;

  orders.forEach((order) => {
    if(order.id === orderId){
      const productsArray = order.products;
      orderTime = dayjs(order.orderTime);

      productsArray.forEach((product) => {
        if(product.productId === productId){
          productQuantity = product.quantity
          productDeliveryTime = product.estimatedDeliveryTime
        }
      })
    }
  })

  const today = dayjs();
  const deliveryTime = dayjs(productDeliveryTime);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
 
  const product = getProduct(productId);

  const deliveredMessage = today < deliveryTime ? 'Arriving On' : 'Delivered On';

  let trackingHTML = '';

  trackingHTML += `

  <a class="back-to-orders-link link-primary" href="orders.html">
  View all orders
  </a>

  <div class="delivery-date">
  ${deliveredMessage} ${dayjs(productDeliveryTime).format('dddd, MMM DD')}
  </div>

  <div class="product-info">
  ${product.name}
  </div>

  <div class="product-info">
  Quantity: ${productQuantity}
  </div>

  <img class="product-image" src="${product.image}">

  <div class="progress-labels-container">
  <div class="progress-label ${
    percentProgress < 50 ? 'current-status' : ''
  }">
    Preparing
  </div>
  <div class="progress-label ${
    (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
  }">
    Shipped
  </div>
  <div class="progress-label ${
    percentProgress >= 100 ? "current-status" : ''
  }">
    Delivered
  </div>
  </div>

  <div class="progress-bar-container">
  <div class="progress-bar" style="
    width: ${percentProgress}%;
  "></div>
  </div>
  `;

  document.querySelector('.js-order-tracking')
    .innerHTML = trackingHTML;   
  
}

renderTrackingPage();