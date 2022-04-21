import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    return await fetch("https://dummyjson.com/products?limit=5").then((res) =>
      res.json()
    );
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: null,
  },
  reducers: {
    updateProduct: (state, action) => {
      const { id, type } = action.payload;
      const foundProduct = state.products.products.find(
        (product) => product.id === id
      );
      if (type === "add") {
        foundProduct.stock++;
      } else if (type === "remove") {
        foundProduct.stock--;
      }
    },
    addOwnProduct: (state, action) => {
      const { title, price, stock } = action.payload;
      const id = state.products.products.length + 1;
      state.products.products.push({ id, title, price, stock });
    },
    editProduct: (state, action) => {
      const { id, title, price, stock } = action.payload;
      state.products.products[id].title = title;
      state.products.products[id].price = price;
      state.products.products[id].stock = stock;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [getProducts.rejected]: (state) => {
      state.status = "failed";
    },
  },
});
export const { updateProduct, addOwnProduct, editProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
