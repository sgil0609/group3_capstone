import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductList = ({selectedCategory}) => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        const filtered = data.filter(p => p.productCategoryId == selectedCategory);
        console.log(selectedCategory);
        console.log(filtered);
        setProducts(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-box">
          <Link to={`/product/${product.id}/details`}>
            <img src={product.imageUrl} alt="Product Image"></img>
          </Link>
          <h3>{product.name}</h3>
          {/* <p>${product.price}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;