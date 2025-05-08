import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js"; 

loadProductsFetch().then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})