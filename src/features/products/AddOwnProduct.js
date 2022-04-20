/* eslint-disable no-unused-vars */
// eslint-disable-next-line prettier/prettier
import React, {useState, useRef, reset} from "react";
import { addOwnProduct } from "./productsSlice";
import { useDispatch } from "react-redux";
function AddOwnProduct() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (productName === "" || productPrice === "" || productStock === "") {
      alert("fill");
    } else {
      dispatch(
        addOwnProduct({
          title: productName,
          price: Number(productPrice),
          stock: Number(productStock),
        })
      );
      formRef.current.reset();
    }
  };

  return (
    <>
      <form
        ref={formRef}
        id="create-course-form"
        className="add-own-product-form"
        onSubmit={handleOnSubmit}
      >
        <h2>Add Own Product</h2>
        <div className="add-own-product-from__box">
          <label>Product Name</label>
          <input type="text" onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="add-own-product-from__box">
          <label>Product Price</label>
          <input
            type="number"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="add-own-product-from__box">
          <label>Product Stock</label>
          <input
            type="number"
            onChange={(e) => setProductStock(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </>
  );
}

export default AddOwnProduct;
