import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ProductDetails = ({ setCartItems, cartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setProduct(data);
        } else {
          throw new Error("Invalid response: not JSON");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = (product) => {
    if (product) {
      console.log(cartItems);
      let newCartItems = [...cartItems];
      newCartItems.push(product);
      setCartItems(newCartItems);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img src={product.imageUrl} alt="Product Image"></img>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
