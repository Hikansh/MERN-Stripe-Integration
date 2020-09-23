import React from 'react';
import { withRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { PUBLIC_KEY_STRIPE } from './keys';
import './Cart.scss';

const Cart = ({ selectedProduct, history }) => {
  const fetchCheckoutSession = async ({ quantity }) => {
    return fetch('http://localhost:7000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prodName: selectedProduct.name,
        prodImg: selectedProduct.img,
        prodPrice: selectedProduct.price,
      }),
    }).then((res) => res.json());
  };

  const handleClick = async (event) => {
    const stripePromise = loadStripe(PUBLIC_KEY_STRIPE);
    const stripe = await stripePromise;
    const { sessionId } = await fetchCheckoutSession({
      quantity: 1,
    });
    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
    // history.push('/checkout');
  };

  if (selectedProduct == null) {
    history.push('/');
    return '';
  } else {
    return (
      <div className="container my-3" id="cart-container">
        <h1>Your Shopping Cart</h1>
        <div className="row mt-5">
          <div className="col-md-4">
            <img
              className="img-thumbnail"
              height="150"
              width="150"
              src={selectedProduct.img}
              alt={selectedProduct.name}
            />
          </div>
          <div className="col-md-4 my-auto">
            <h3>{selectedProduct.name}</h3>
          </div>
          <div className="col-md-4 my-auto">
            <h5>Total: $ {selectedProduct.price}</h5>
          </div>
        </div>
        <div className="row my-5 pay">
          <button role="link" className="btn btn-dark" onClick={handleClick}>
            Pay Now
          </button>
        </div>
        <h2>Accepted Payment methods</h2>
        <hr />
        <div className="row mt-5 pay">
          <div className="col-md-2 col-4">
            <i class="fab fa-cc-visa fa-5x" style={{ color: 'blueviolet' }}></i>
          </div>
          <div className="col-md-2 col-4">
            <i class="fab fa-cc-amex fa-5x" style={{ color: 'royalblue' }}></i>
          </div>
          <div className="col-md-2 col-4">
            <i
              class="fab fa-cc-mastercard fa-5x"
              style={{ color: 'orange' }}
            ></i>
          </div>
          <div className="col-md-2 col-4">
            <i class="fab fa-google-pay fa-5x" style={{ color: 'red' }}></i>
          </div>
          <div className="col-md-2 col-4">
            <i class="fab fa-alipay fa-5x" style={{ color: 'skyblue' }}></i>
          </div>
          <div className="col-md-2 col-4">
            <i class="fab fa-cc-jcb fa-5x" style={{ color: 'greenyellow' }}></i>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(Cart);
