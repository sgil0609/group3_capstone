import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ProductDetails = ({ setCartItems, cartItems, updateCartCount }) => {
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
      let newCartItems = [...cartItems];
      const existingItem = newCartItems.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newCartItems.push({ ...product, quantity: 1 });
      }

      setCartItems(newCartItems);
      updateCartCount(newCartItems);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img src={product.imageUrl} alt="Product Image" className="product-image"></img>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => handleAddToCart(product)} className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
