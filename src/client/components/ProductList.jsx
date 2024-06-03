import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = ({ selectedCategories = [], isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    productCategoryId: "",
    imageUrl: "",
    price: "",
  });

  useEffect(() => { // Fetching products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
        const filtered = data.filter(product => selectedCategories.includes(product.productCategoryId.toString()));
   
        setProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProducts();
  }, [selectedCategories]);

  const deleteProduct = async (id) => { // Delete products only if user is Admin
    try {

      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/product/delete/${id}`, { 
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

  const handleAddProduct = async (e) => { // Add products only if user is Admin
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setShowAddProductForm(false);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <div className="product-list">
      {isAdmin && (
        <div className="add-product-button">
          <button onClick={() => setShowAddProductForm(true)}>Add Product</button>
          {showAddProductForm && (
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Product Category ID"
                value={newProduct.productCategoryId}
                onChange={(e) => setNewProduct({ ...newProduct, productCategoryId: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </form>
          )}
        </div>
      )}
      {products.map((product) => (
        <div key={product.id} className="product-box">
          <Link to={`/product/${product.id}/details`}>
            <img src={product.imageUrl} alt="Product" />
          </Link>
          <h3>{product.name}</h3>
          {isAdmin && <button onClick={() => deleteProduct(product.id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
};

export default ProductList;