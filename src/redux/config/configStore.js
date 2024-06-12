import { configureStore } from "@reduxjs/toolkit";
import expensesSlice from "../slices/expensesSlice";

const store = configureStore({
  reducer: {
    expenses: expensesSlice,
  },
});

export default store;
