import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../components/weatherapi";

const reducer = configureStore({
  reducer: weatherReducer,
});

export default reducer;