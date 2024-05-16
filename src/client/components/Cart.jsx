import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cartItems, setCartItems, updateCartCount }) => {
  const calculateTotalCost = () => {
    if (cartItems.length === 0) {
      return 0;
    }

    let total = 0;
    cartItems.forEach((item) => {
      const itemPrice = Number(item.price);
      const itemQuantity = Number(item.quantity);
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        total += itemPrice * itemQuantity;
      }
    });
    return total;
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    updateCartCount(updatedCartItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateCartCount(updatedCartItems);
  };

  const handleCheckout = () => {
    setCartItems([]);
    updateCartCount([]);
    alert("Checkout completed!");
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>Price: ${item.price}</p>
                  <div className="cart-item-actions">
                    <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="cart-item-quantity"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-icon"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>Total: ${calculateTotalCost()}</div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

