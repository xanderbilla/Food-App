import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, title, size, price, img, quantity, extras } = action.payload;
      state.quantity += quantity;
      state.products.push({
        id,
        title,
        img,
        size,
        price,
        quantity,
        extras
      });
      state.total += price * quantity;
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;
      const productIndex = state.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
        state.products.splice(productIndex, 1);
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = null;
      state.total = 0;
    }
  }
});

export const { addProduct, removeProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
