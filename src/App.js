import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import About from './components/Shop/Shop';
import User from './components/User/User';
import ShopToken from './components/Shop/ShopTokens';
import Admin from './components/Admin/Admin';
import UserShopToken from './components/User/userShowTokenShop.js';
import UserBookingHistory from './components/User/UserBookingHistory.js';

export default function App() {

      return(
        <Router>
          <div className="header">
            <label>Black Lives Matter. <a href="https://support.eji.org/give/153413/#!/donation/checkout" target='_blank'>  Support the Equal Justice Initiative</a></label>
          </div>
          <Switch>
            <Route path="/user/booked-tokens/:id">
                <UserBookingHistory/>
            </Route>
            <Route path="/user/shop/:id/:userId">
                <UserShopToken/>
            </Route>
            <Route path="/shop/tokens/:id">
                <ShopToken/>
            </Route>
            <Route path="/user/:id" >
                <User/>
            </Route>
            <Route path="/shop/:id">
               <About />
            </Route>
            <Route path='/admin/:id' render={(props) => <Admin {...props}/>}/>
              
            <Route path="/">
                <Home />
            </Route>
          </Switch>
      </Router>
      );
}