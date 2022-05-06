import React, { useState, useRef } from "react";
import { addOwnProduct } from "./productsSlice";
import { useDispatch } from "react-redux";
function AddOwnProduct() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [product, setProduct] = useState([]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (product.name === "" || product.price === "" || product.stock === "") {
      alert("Fill all fields");
    } else {
      dispatch(
        addOwnProduct({
          title: product.name,
          price: Number(product.price),
          stock: Number(product.stock),
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
          <input name="name" type="text" onChange={handleChange} />
        </div>
        <div className="add-own-product-from__box">
          <label>Product Price</label>
          <input name="price" type="number" onChange={handleChange} />
        </div>
        <div className="add-own-product-from__box">
          <label>Product Stock</label>
          <input name="stock" type="number" onChange={handleChange} />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </>
  );
}

export default AddOwnProduct;
