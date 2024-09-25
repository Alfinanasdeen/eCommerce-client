import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.products.find((product) => product._id === id);
      if (product) {
        const prevQuantity = product.quantity;
        product.quantity = quantity;

        state.total += product.price * (quantity - prevQuantity);
      }
    },
  },
});

export const { addProduct, adjustQuantity } = cartSlice.actions;
export default cartSlice.reducer;
