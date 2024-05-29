import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SubNavHome = () => {
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/">Home</Link>
    </div>
  );
};
const SubNavMens = ({ setSelectedCategory }) => { // Add category for Mens
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/mens" onClick={() => setSelectedCategory("mens")}>Mens <i className="fa fa-caret-down"></i></Link>
      <div className="subnav-content">
        <Link to="/mens/tops">Tops</Link>
        <Link to="/mens/bottoms">Bottoms</Link>
        <Link to="/mens/shoes">Shoes</Link>
      </div>
    </div>
  );
};

const SubNavWomens = ({ setSelectedCategory }) => { // Add category for Womens
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/womens" onClick={() => setSelectedCategory("womens")}>Womens <i className="fa fa-caret-down"></i></Link>
      <div className="subnav-content">
        <Link to="/womens/tops">Tops</Link>
        <Link to="/womens/bottoms">Bottoms</Link>
        <Link to="/womens/shoes">Shoes</Link>
      </div>
    </div>
  );
};

const SubNavAccount = ({ user, handleLogout }) => { // User Account Tab for Navigation Bar
  const [dropdownVisible, setDropDownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropDownVisible(!dropdownVisible);
  };

  const handleAdminUsersClick = () => {
    if (!user && user.role === "admin") {
      navigate("/admin/users");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <div className="subnav">
    {user ? (
      <div>
        <span className="admin" onClick={toggleDropdown}>{user.name} <i className={`fa fa-caret-${dropdownVisible ? 'up' : 'down'}`}></i></span>
        {dropdownVisible && (
          <div className="subnav-content">
            {user.role === "admin" && (
              <>
                <Link to="/admin/users" onClick={handleAdminUsersClick}>Manage Users</Link>
              </>
            )}
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </div>
        )}
      </div>
    ) : (
      <Link className="subnavbtn" to="/login"> My Account <i className="fa fa-caret-down"></i></Link>
    )}
    {user ? null : ( 
      <div className="subnav-content">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )}
  </div>
);
};

export { SubNavHome, SubNavMens, SubNavWomens, SubNavAccount };