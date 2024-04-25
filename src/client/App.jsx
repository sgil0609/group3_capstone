import { useState } from "react";
import reactLogo from "./assets/react.svg";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import './style.css';

const SubNavHome = () => {
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/">Home</Link>
    </div>
  );
};

const SubNavMens = () => {
  return (
    <div className="subnav">
        <Link className="subnavbtn" to="/mens">Mens <i className="fa fa-caret-down"></i></Link>
        <div className="subnav-content">
            <Link to="/mens/tops">Tops</Link>
            <Link to="/mens/bottoms">Bottoms</Link>
            <Link to="/mens/shoes">Shoes</Link>
        </div>
    </div>
  );
};

const SubNavWomens = () => {
  return (
    <div className="subnav">
        <Link className="subnavbtn" to="/womens">Womens <i className="fa fa-caret-down"></i></Link>
        <div className="subnav-content">
            <Link to="/womens/tops">Tops</Link>
            <Link to="/womens/bottoms">Bottoms</Link>
            <Link to="/womens/shoes">Shoes</Link>
        </div>
    </div>
  );
};

const SubNavAccount = () => {
  return (
    <div className="subnav">
        <Link className="subnavbtn" to="/login">My Account <i className="fa fa-caret-down"></i></Link>
        <div className="subnav-content">
            <Link to="/login">Login</Link>
            <Link to="/login">Register</Link>
        </div>
    </div>
  );
};

function App() {
  return (
      <div>
        <header>
          <div className="logo">SADD</div>
          <div className="navbar">
            <SubNavHome />
            <SubNavMens />
            <SubNavWomens />
            <SubNavAccount />
          </div>
        </header>
          <ProductList />
          <Login />           
    </div>
  );
}

export default App;
