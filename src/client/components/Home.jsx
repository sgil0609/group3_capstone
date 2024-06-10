import React from "react";
import AFDenim from "../assets/images/23-AFDenim.jpeg";
import CKJ from "../assets/images/ckj.jpeg";
import HM from "../assets/images/hmgoepprod.jpeg";

export default function Home() {
  return (
    <div className="home">
      <div className="top-image">
        <img src={AFDenim} alt="denim" />
        <div className="overlay">
          <h1>Welcome to Our Store</h1>
          <p>Discover the latest trends in fashion.</p>
          <button className="shop-now">Shop Now</button>
        </div>
      </div>
      <div className="products-grid">
        <div className="product">
          <img src={CKJ} alt="Calvin Klein Jeans" />
          <div className="product-info">
            <h2>Calvin Klein Jeans</h2>
            <p>Stylish and comfortable denim for any occasion.</p>
            <button className="shop-now">Shop Now</button>
          </div>
        </div>
        <div className="product">
          <img src={HM} alt="H&M" />
          <div className="product-info">
            <h2> SAAD Collection</h2>
            <p>Affordable fashion for every season.</p>
            <button className="shop-now">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
