import React from 'react';
import './Products.scss';
import { withRouter } from 'react-router-dom';

const Products = ({ products, selectProduct, history }) => {
  const handlePurchase = (prod) => () => {
    selectProduct(prod);
    history.push('/cart');
    // history.push('/checkout');
  };

  const returnProducts = () => {
    return products.map((prod) => (
      <div className="product" key={prod.id}>
        <img src={prod.img} alt={prod.name} />
        <section>
          <h2>{prod.name}</h2>
          <p>{prod.desc}</p>
          <h3>{'$' + prod.price}</h3>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handlePurchase(prod)}
          >
            PURCHASE
          </button>
        </section>
      </div>
    ));
  };

  return (
    <div id="product-container" className="my-3">
      <h1 id="head">Hikansh's Store</h1>
      {returnProducts()}
    </div>
  );
};

export default withRouter(Products);
