import React from "react";
import ReactDOM from "react-dom/client";
import WrapComponent from "./components/WrapComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import viewProduct from "./store/viewProduct";
import wishlist from "./store/wishlist";
import confirmModal from "./store/confirmModal";
import mainModal from "./store/mainModal";
import cart from "./store/cart";
import reactDaumPostcode from "./store/reactDaumPostcode";
import { CookiesProvider } from "react-cookie";
let store = configureStore({
  reducer: {
    viewProduct,
    wishlist,
    confirmModal,
    mainModal,
    cart,
    reactDaumPostcode,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <CookiesProvider>
        <React.StrictMode>
          <WrapComponent />
        </React.StrictMode>
      </CookiesProvider>
    </Provider>
  </BrowserRouter>
);
