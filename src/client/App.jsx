import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { SubNavHome, SubNavMens, SubNavWomens, SubNavAccount } from "./components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Cart from "./components/cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const updateCartCount = (items) => {
    const totalCount = items.reduce((total, item) => total + Number(item.quantity), 0);
    setCartCount(totalCount);
  };

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
          <span className="cart-count"> {cartCount} items </span>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/productlist" element={<ProductList category={selectedCategory} />} />
        <Route path="/product/:id/details" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} updateCartCount={updateCartCount} />} />
        <Route path="/mens" element={<ProductList selectedCategories={["4", "5","6"]} />} />
        <Route path="/mens/tops" element={<ProductList selectedCategories={["4"]} />} />
        <Route path="/mens/bottoms" element={<ProductList selectedCategories={["5"]} />} />
        <Route path="/mens/shoes" element={<ProductList selectedCategories={["6"]} />} />
        <Route
          path="/womens"
          element={<ProductList selectedCategories={["1", "2","3"]} />} />
        <Route path="/womens/tops" element={<ProductList selectedCategories={["1"]} />} />
        <Route path="/womens/bottoms" element={<ProductList selectedCategories={["2"]} />} />
        <Route path="/womens/shoes" element={<ProductList selectedCategories={["3"]} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} updateCartCount={updateCartCount} />} />
      </Routes>
    </div>
  );
}

export default App;