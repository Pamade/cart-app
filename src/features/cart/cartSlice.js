import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price } = action.payload;
      const isInCart = state.cart.find((item) => item.id === id);
      state.totalPrice += price;

      if (!isInCart) {
        const stock = 1;
        state.cart.push({ id: id, title: title, price: price, stock: stock });
      } else {
        isInCart.stock++;
      }
    },
    removeFromCart: (state, action) => {
      const foundProduct = state.cart.find(
        (item) => item.id === action.payload
      );
      foundProduct.stock--;
      state.cart = state.cart.filter((item) => item.stock !== 0);
      state.totalPrice -= foundProduct.price;
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
