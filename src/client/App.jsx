import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { SubNavHome, SubNavMens, SubNavWomens, SubNavAccount } from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";


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
        <Route path="/productlist" element={<ProductList category={selectedCategory} />} />
        <Route path="/mens" element={<ProductList category="mens" />} />
        <Route path="/womens" element={<ProductList category="womens" />} />
        <Route path="/product/:id/details" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
