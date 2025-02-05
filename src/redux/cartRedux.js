import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      // Add product to state
      const existingProduct = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }

      state.quantity = state.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      state.total += action.payload.price * action.payload.quantity;

      // Make an API request to save the cart data to the backend
      // Make sure to send token for authentication
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3003/api/carts/cart",
          {
            products: state.products,
            total: state.total,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Cart saved successfully", response.data);
        })
        .catch((error) => {
          console.error("Error saving cart to database", error);
        });
    },

    adjustQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find((product) => product._id === id);
      if (product) {
        const prevQuantity = product.quantity;
        product.quantity = quantity;
        state.total += product.price * (quantity - prevQuantity);

        // Make an API request to update the cart data on the backend
        axios
          .put(`http://localhost:3003/api/carts/${id}`, { quantity: quantity })
          .then((response) => {
            console.log("Cart quantity updated successfully", response.data);
          })
          .catch((error) => {
            console.error("Error updating cart quantity", error);
          });
      }
    },

    removeProduct: (state, action) => {
      console.log("Payload:", action.payload);
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      // Update the total after removing a product
      state.total = state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3003/api/carts/cart/${action.payload}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Product removed from cart", response.data);
        })
        .catch((error) => {
          console.error("Error removing product from cart", error);
        });
    },
  },
});

export const { addProduct, adjustQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
