import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ selectedCategories = [] }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
        const filtered = data.filter(product => selectedCategories.includes(product.productCategoryId.toString()));
        console.log(selectedCategories);
        console.log(filtered);
        setProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProducts();
  }, [selectedCategories]);

  const deleteProduct = async (id) => {
    try {

      const token = localStorage.getItem("token");

      const response = await fetch(`https://group3-capstone-test.onrender.com/api/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== id));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-box">
          <Link to={`/product/${product.id}/details`}>
            <img src={product.imageUrl} alt="Product" />
          </Link>
          <h3>{product.name}</h3>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;