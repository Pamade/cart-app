import React, { useEffect } from "react";
import { getProducts } from "./productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { updateProduct } from "../products/productsSlice";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.products);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (id, title, price) => {
    dispatch(addToCart({ id, title, price }));
    dispatch(updateProduct({ id, type: "remove" }));
  };

  if (status === "loading") {
    return <h3>loading ...</h3>;
  }
  return (
    <>
      <h2>Products</h2>
      {products &&
        products.map((product, i) => (
          <div key={i}>
            <p>
              {product.title} | price: {product.price}$ | stock: {product.stock}{" "}
              {product.stock > 0 ? (
                <button
                  onClick={handleAddToCart.bind(
                    this,
                    product.id,
                    product.title,
                    product.price
                  )}
                >
                  Add
                </button>
              ) : (
                ""
              )}
            </p>
          </div>
        ))}
    </>
  );
}

export default Products;
