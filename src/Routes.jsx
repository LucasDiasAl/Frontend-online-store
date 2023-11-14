import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/home/Home';
import ShoppingCart from './Components/shoppingCart/ShoppingCart';
import Products from './Components/Products';
import Checkout from './Components/checkout/Checkout';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/ShoppingCart" component={ ShoppingCart } />
          <Route exact path="/Products/:id" component={ Products } />
          <Route exact path="/Checkout" component={ Checkout } />
        </Switch>
      </div>
    );
  }
}

export default Routes;
