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


export default function App() {

      return(
        <Router>
          <div className="header">
            <label>Black Lives Matter. <a href="https://support.eji.org/give/153413/#!/donation/checkout">  Support the Equal Justice Initiative</a></label>
          </div>
          <Switch>
            <Route path="/user/:id" >
             <User/>
            </Route>
            <Route path="/shop/:id">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
      );
}