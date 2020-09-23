import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import { products } from './list-of-products';
import Success from './Success';
import Error from './Error';

const App = () => {
  const history = useHistory();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div className="container">
              <Products
                products={products}
                selectProduct={setSelectedProduct}
                history={history}
              />
            </div>
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <Cart selectedProduct={selectedProduct} history={history} />
          )}
        />
        <Route
          path="/success"
          render={() => (
            <Success selectedProduc={selectedProduct} history={history} />
          )}
        />
        <Route path="/error" render={() => <Error />} />
      </Switch>
    </Router>
  );
};

export default App;
