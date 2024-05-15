import React from "react";
import { Link } from "react-router-dom";

const SubNavHome = () => {
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/">Home</Link>
    </div>
  );
};
const SubNavMens = ({ setSelectedCategory }) => {
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

const SubNavWomens = ({ setSelectedCategory }) => {
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

const SubNavAccount = () => {
  return (
    <div className="subnav">
      <Link className="subnavbtn" to="/login"> My Account <i className="fa fa-caret-down"></i></Link>
      <div className="subnav-content">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export { SubNavHome, SubNavMens, SubNavWomens, SubNavAccount };