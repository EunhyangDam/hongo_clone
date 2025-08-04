import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "장바구니",
  initialState: {
    cart: [],
    subTotal: 0,
    toatlDiscount: 0,
    shipping: 0,
    total: 0,
  },
  reducers: {
    cartAddAction(state, action) {
      state.cart = action.payload;
      const cart = state.cart.map((el) => ({
        ...el,
        price: Math.round(el["net price"] * (1 - el.discount)),
        totalPrice: Math.round(
          el["net price"] * (1 - el.discount) * el.quantity
        ),
        totalDiscount: Math.round(el["net price"] * el.discount * el.quantity),
      }));

      let subTotal = 0;
      let totalDiscount = 0;
      let shipping = 0;
      let total = 0;

      cart.forEach((el) => {
        subTotal += el.totalPrice;
        totalDiscount += el.totalDiscount;
        shipping = state.totalPrice < 500 ? 12 : 0;
        total = shipping + subTotal;
      });

      state.subTotal = subTotal;
      state.toatlDiscount = totalDiscount;
      state.shipping = shipping;
      state.total = total;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export default cart.reducer;
export const { cartAddAction } = cart.actions;
