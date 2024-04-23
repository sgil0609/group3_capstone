import React, { useState, useEffect } from "react";
import { getProducts } from "../../server/api/product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    await fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
