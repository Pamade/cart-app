import React from "react";
import "./App.css";
import Products from "./features/products/Products";
import Cart from "./features/cart/Cart";
import AddOwnProduct from "./features/products/AddOwnProduct";
function App() {
  return (
    <div className="App">
      <div className="products-cart">
        <div className="products-cart__products">
          <Products />
        </div>
        <div className="products-cart__cart">
          <Cart />
        </div>
      </div>
      <AddOwnProduct />
    </div>
  );
}

export default App;
