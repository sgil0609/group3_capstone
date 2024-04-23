import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {/* Will display cart items here */}
      <div>Total: {/*Calculate total cost */}</div>
      {/* Will add a checkout button */}
    </div>
  );
};

export default Cart;
