import React, { useContext, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Homepage from './Homepage';
import { getCurrentUser } from '../services/auth.service';
import UserContext from '../context/userContext';

const Navbar = () => {

    const {currentUser,logout} = useContext(UserContext);

    return (
       <Router>
      <nav className="navbar navbar-inverse bg-dark">
       <div className="container-fluid">

    {currentUser.id.length>0 ? 
      <div className="container-fluid">
        <ul className="nav navbar-nav">
      <li className="text-white mr-4"> 
        <Link className="nav-link text-white" to="/profile">Profile</Link>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
      <div className="row">
      <li className="text-white mr-4"> 
      <Link onClick={()=>logout()} className="nav-link text-white" to="/login">Logout</Link>
      </li>
      </div>
    </ul>
      </div>
    :
    <div className="container-fluid">
    <ul className="nav navbar-nav">
  <li className="text-white mr-4"> 
    <Link className="nav-link text-white" to="/profile">Homepage</Link>
    </li>
  </ul>
  <ul className="nav navbar-nav navbar-right">
  <div className="row">
  <li className="text-white mr-4"> 
  <Link className="nav-link text-white" to="/login">Login</Link>
  </li>
  <li className="text-white mr-4"> 
  <Link className="nav-link text-white" to="/register">Register</Link>
  </li>
  </div>
</ul>
  </div>
    }
  </div>
</nav>
<Switch>
<Route exact path="/">
        <Homepage/>
    </Route>
    <Route path="/login">
        <Login/>
    </Route>
    <Route path="/register">
        <Register/>
    </Route>
    <Route path="/profile">
        <Profile/>
    </Route>
</Switch>
       </Router>
    );
};

export default Navbar;