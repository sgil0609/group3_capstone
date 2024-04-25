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
        <button className="subnavbtn" to>Mens <i className="fa fa-caret-down"></i></button>
        <div className="subnav-content">
            <a href="tops">Tops</a>
            <a href="bottoms">Bottoms</a>
            <a href="shoes">Shoes</a>
        </div>
    </div>
  );
};

const SubNavWomens = () => {
  return (
    <div className="subnav">
        <button className="subnavbtn">Womens <i className="fa fa-caret-down"></i></button>
        <div className="subnav-content">
            <a href="tops">Tops</a>
            <a href="bottoms">Bottoms</a>
            <a href="shoes">Shoes</a>
        </div>
    </div>
  );
};

const SubNavAccount = () => {
  return (
    <div className="subnav">
        <button className="subnavbtn">My Account <i className="fa fa-caret-down"></i></button>
        <div className="subnav-content">
            <a href="login">Login</a>
            <a href="register">Register</a>
        </div>
    </div>
  );
};

function App() {
  return (
    <>
      <div>
        <header>
          <div className="logo">SADD</div>
          <div className="navbar">
            <SubNavHome />
            <SubNavMens />
            <SubNavWomens />
            <SubNavAccount />
            <Login />
            <ProductList />
          </div>
        </header>
    </div>
    </>
  );
}

export default App;
