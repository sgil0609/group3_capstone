import React from "react";

const Cart = ({ cartItems, setCartItems }) => {
  const calculateTotalCost = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += Number(item.price);
    });
    return total;
  };

  const handleCheckout = () => {
    setCartItems([]);
    alert("Checkout completed!");
  };
  console.log(cartItems);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
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
