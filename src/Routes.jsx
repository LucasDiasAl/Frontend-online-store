import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/home/Home';
import ShoppingCart from './Components/shoppingCart/ShoppingCart';
import Products from './Components/product/Products';
import Checkout from './Components/checkout/Checkout';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/ShoppingCart" component={ ShoppingCart } />
        <Route exact path="/Products/:id" component={ Products } />
        <Route exact path="/Checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default Routes;
