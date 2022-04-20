import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./cartSlice";
import { updateProduct } from "../products/productsSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    dispatch(updateProduct({ id, type: "add" }));
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <h3>Total Price: {totalPrice}$</h3>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <p key={cart.id}>
              {item.title}, price: {item.price}$, stock: {item.stock}{" "}
              <button onClick={handleRemove.bind(this, item.id)}>
                Remove -1
              </button>
            </p>
          ))
        ) : (
          <h3>Cart is empty</h3>
        )}
      </div>
    </div>
  );
}

export default Cart;
