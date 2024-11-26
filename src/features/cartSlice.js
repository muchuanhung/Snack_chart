import { createSlice } from '@reduxjs/toolkit';

// 計算購物車商品總數
const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const initialState = {
  items: storedItems,
  totalQuantity: storedItems.reduce((total, item) => total + item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 新增商品到購物車
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // 更新商品數量
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(quantity, 1);
      }
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    // 刪除商品
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
