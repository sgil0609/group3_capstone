import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AdminUsers from "./components/AdminUsers";
import { SubNavHome, SubNavMens, SubNavWomens, SubNavAccount } from "./components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Cart from "./components/Cart";


function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Define cartCount state
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state

  const navigate = useNavigate();

  const updateCartCount = (items) => {
    const totalCount = items.reduce(
      (total, item) => total + Number(item.quantity),
      0
    );
    setCartCount(totalCount);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAdmin(false); // Reset isAdmin
    navigate('/login'); // Redirect to the login page after logging out
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return ( // Defining the routes
    <div>
      <header>
        <div className="logo">SADD</div>
        <div className="navbar">
          <SubNavHome />
          <SubNavMens setSelectedCategory={setSelectedCategory} />
          <SubNavWomens setSelectedCategory={setSelectedCategory} />
          <SubNavAccount user={user} handleLogout={handleLogout} />
          <Link className="subnavbtn" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <span className="cart-count"> {cartCount} items </span>{" "}
          {/* Display cartCount */}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} setIsAdmin={setIsAdmin}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/productlist" element={<ProductList category={selectedCategory} isAdmin={isAdmin} />} />
        <Route path="/product/:id/details" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} updateCartCount={updateCartCount} />} />
        <Route path="/admin/users" element={<AdminUsers user={user} />} />
        <Route path="/mens" element={<ProductList selectedCategories={["4", "5", "6"]} isAdmin={isAdmin} />} />
        <Route path="/mens/shoes" element={<ProductList selectedCategories={["6"]} isAdmin={isAdmin} />} />
        <Route path="/mens/tops" element={<ProductList selectedCategories={["4"]} isAdmin={isAdmin} />} />
        <Route path="/mens/bottoms" element={<ProductList selectedCategories={["5"]} isAdmin={isAdmin} />} />
        <Route path="/womens" element={<ProductList selectedCategories={["1", "2", "3"]} isAdmin={isAdmin} />} />
        <Route path="/womens/tops" element={<ProductList selectedCategories={["1"]} isAdmin={isAdmin} />} />
        <Route path="/womens/bottoms" element={<ProductList selectedCategories={["2"]} isAdmin={isAdmin} />} />
        <Route path="/womens/shoes" element={<ProductList selectedCategories={["3"]} isAdmin={isAdmin} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} updateCartCount={updateCartCount} />} />
      </Routes>
    </div>
  );
}

export default App;