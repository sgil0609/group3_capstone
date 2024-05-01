import { useState } from "react";
import reactLogo from "./assets/react.svg";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import ProductDetails from "./components/ProductDetails";

const SubNavAccount = () => {
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/login">
        My Account <i className="fa fa-caret-down"></i>
      </Link>
      <div className="subnav-content">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

const SubNavHome = () => {
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/">
        Home
      </Link>
    </div>
  );
};

const SubNavMens = () => {
  const setSelectedCategory = (category) => {};

  return (
    <div className="subnav">
      <Link
        className="subnavbtn"
        to="/mens"
        onClick={() => setSelectedCategory("mens")}
      >
        Mens <i className="fa fa-caret-down"></i>
      </Link>
      <div className="subnav-content">
        <Link to="/mens/tops">Tops</Link>
        <Link to="/mens/bottoms">Bottoms</Link>
        <Link to="/mens/shoes">Shoes</Link>
      </div>
    </div>
  );
};

const SubNavWomens = () => {
  const setSelectedCategory = (category) => {
    return (
      <div className="subnav">
        <Link
          className="subnavbtn"
          to="/womens"
          onClick={() => setSelectedCategory("womens")}
        >
          Womens <i className="fa fa-caret-down"></i>
        </Link>
        <div className="subnav-content">
          <Link to="/womens/tops">Tops</Link>
          <Link to="/womens/bottoms">Bottoms</Link>
          <Link to="/womens/shoes">Shoes</Link>
        </div>
      </div>
    );
  };

  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/login">
        My Account <i className="fa fa-caret-down"></i>
      </Link>
      <div className="subnav-content">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div>
      <header>
        <div className="logo">SADD</div>
        <div className="navbar">
          <SubNavHome />
          <SubNavMens onClick={() => setSelectedCategory("mens")} />
          <SubNavWomens onClick={() => setSelectedCategory("womens")} />
          <SubNavAccount />
          <Link className="subnavbtn" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/productlist"
          element={<ProductList category={selectedCategory} />}
        />
        <Route path="/mens" element={<ProductList category="mens" />} />
        <Route path="/womens" element={<ProductList category="womens" />} />
        <Route path="/product/:id/details" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
