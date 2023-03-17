import { createSlice } from '@reduxjs/toolkit';

const global = createSlice({
  name: 'global',
  initialState: {
    openDrawer: true,
    reloadList: false,
    table: {},
    cart: [],
    customer_name: '',
    isUpdate: false,
    id_transaksi: null,
  },
  reducers: {
    toogleDrawer: (state, { payload }) => {
      console.log(payload);
      state.openDrawer = !state.openDrawer;
    },
    addCustomer: (state, { payload }) => {
      state.customer_name = payload;
    },
    handleTable: (state, { payload }) => {
      console.log(payload);
      state.table = payload;
    },
    addToCart: (state, { payload }) => {
      const index = state.cart.findIndex((x) => x.id_menu === payload.id_menu);
      if (index !== -1) {
        state.cart[index].qty = state.cart[index].qty + 1;
      } else {
        state.cart = [
          ...state.cart,
          {
            ...payload,
            qty: 1,
          },
        ];
      }
    },
    minusCart: (state, { payload }) => {
      const index = state.cart.findIndex((x) => x.id_menu === payload.id_menu);
      const exist = state.cart[index];
      if (index !== -1) {
        if (exist.qty === 1) {
          state.cart = state.cart.filter((x) => x.id_menu !== payload.id_menu);
        } else {
          state.cart[index].qty = state.cart[index].qty - 1;
        }
      }
    },
    deleteCart: (state, { payload }) => {
      console.log(state.cart[0]);
      const index = state.cart.findIndex((x) => x.id_menu === payload.id_menu);
      if (index !== -1) {
        state.cart = state.cart.filter((x) => x.id_menu !== payload.id_menu);
      }
    },
    checkout: (state, {payload}) => {
      state.cart = []
    },
    handleUpdateOrder: (state, {payload}) => {
      state.isUpdate = payload
    },
    handleGetDetail: (state, {payload}) => {
      state.cart = payload
    },
    handleIdTransaction: (state, {payload}) => {
      state.id_transaksi = payload
    }
  },
});

export const { toogleDrawer, handleTable, addToCart, minusCart, deleteCart, addCustomer, checkout, handleUpdateOrder, handleGetDetail, handleIdTransaction } = global.actions;

export default global.reducer;
