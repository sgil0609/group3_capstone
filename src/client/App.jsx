import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { SubNavHome,SubNavMens,SubNavWomens,SubNavAccount } from "./components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Cart from "./components/cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([0]);

  return (
    <div>
      <header>
        <div className="logo">SADD</div>
        <div className="navbar">
          <SubNavHome />
          <SubNavMens setSelectedCategory={setSelectedCategory} />
          <SubNavWomens setSelectedCategory={setSelectedCategory} />
          <SubNavAccount />
          <Link className="subnavbtn" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <span className="cart-count"> {cartItems.length} items </span>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productlist"element={<ProductList category={selectedCategory} />} />
        <Route path="/product/:id/details" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/mens" element={<ProductList selectedCategory="mens" />} />
        <Route path="/mens/tops" element={<ProductList selectedCategory="4" />} />
        <Route path="/mens/bottoms" element={<ProductList selectedCategory="5" />} />
        <Route path="/mens/shoes" element={<ProductList selectedCategory="6" />} />
        <Route path="/womens" element={<ProductList selectedCategory="womens" />} />
        <Route path="/womens/tops" element={<ProductList selectedCategory="1" />} />
        <Route path="/womens/bottoms" element={<ProductList selectedCategory="2" />} />
        <Route path="/womens/shoes" element={<ProductList selectedCategory="3" />} />
      </Routes>
    </div>
  );
}

export default App;
