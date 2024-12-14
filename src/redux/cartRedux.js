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
      const existingProduct = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity; // Update quantity
      } else {
        state.products.push(action.payload); // Add new product
      }
      state.quantity += action.payload.quantity; // Update cart total quantity
      state.total += action.payload.price * action.payload.quantity; // Update total price
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
    removeProduct: (state, action) => {
      const productId = action.payload;
      const productToRemove = state.products.find(
        (product) => product._id === productId
      );
      if (productToRemove) {
        state.total -= productToRemove.price * productToRemove.quantity;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      }
    },
  },
});

export const { addProduct, adjustQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
