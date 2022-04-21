/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { getProducts, editProduct } from "./productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { updateProduct } from "../products/productsSlice";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products.products);
  const status = useSelector((state) => state.products.status);
  const cart = useSelector((state) => state.cart.cart);
  const formRef = useRef(null);
  const [productInCart, setProductInCart] = useState(true);
  const [editingItem, setEditingItem] = useState({});
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleEditItem = (productId) => {
    const productInCartFound = cart.find(
      (itemCart) => itemCart.id === productId
    );
    setProductInCart(productInCartFound);
    if (typeof productInCartFound === "undefined") {
      const chosenItem = products.find((product) => product.id === productId);
      setEditingItem(chosenItem);
    }
  };

  const handleAddToCart = (id, title, price) => {
    dispatch(addToCart({ id, title, price }));
    dispatch(updateProduct({ id, type: "remove" }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (productName === "" || productPrice === "" || productStock === "") {
      return alert("Fill all fields");
    }
    dispatch(
      editProduct({
        id: editingItem.id - 1,
        title: productName,
        price: Number(productPrice),
        stock: Number(productStock),
      })
    );
    setProductInCart(true);
    setEditingItem({});
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
                <>
                  <button onClick={handleEditItem.bind(this, product.id)}>
                    Edit
                  </button>
                  {editingItem.id === product.id ? (
                    ""
                  ) : (
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
                  )}
                </>
              ) : (
                ""
              )}
            </p>
          </div>
        ))}
      {!productInCart ? (
        <div className="edit">
          <div>
            <p className="edit__p">You cannot add items which are in cart!</p>
            <p className="edit__p">Fill all fields!</p>
          </div>
          <form ref={formRef} className="edit__form" onSubmit={handleOnSubmit}>
            <h2>Edit {editingItem.title}</h2>
            <div className="edit__box">
              <label>Product Name</label>
              <input
                type="text"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="edit__box">
              <label>Product Price</label>
              <input
                type="number"
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="edit__box">
              <label>Product Stock</label>
              <input
                type="number"
                onChange={(e) => setProductStock(e.target.value)}
              />
            </div>
            <button type="submit">Edit Item</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Products;
