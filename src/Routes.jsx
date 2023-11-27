import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/home';
import ShoppingCart from './Pages/shoppingCart';
import Products from './Pages/productView';
import Checkout from './Pages/checkout';

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
