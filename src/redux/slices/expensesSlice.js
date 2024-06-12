import { createSlice } from "@reduxjs/toolkit";
import { TEST_DATA } from "../../constants/testData";

localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : localStorage.setItem("expenses", JSON.stringify(TEST_DATA));

localStorage.getItem("selectMonth")
  ? JSON.parse(localStorage.getItem("selectMonth"))
  : localStorage.setItem("selectMonth", JSON.stringify(1));

const initialState = {
  expenses: TEST_DATA,
  month: [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
    {
      number: 6,
    },
    {
      number: 7,
    },
    {
      number: 8,
    },
    {
      number: 9,
    },
    {
      number: 10,
    },
    {
      number: 11,
    },
    {
      number: 12,
    },
  ],
  totalMonth: "",
  sortType: "latest",
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    createExpense: (state, action) => {
      state.expenses = [action.payload, ...state.expenses];
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },
    deleteExpense: (state, action) => {
      const { id } = action.payload;
      state.expenses = state.expenses.filter((exp) => exp.id !== id);
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },
    editExpense: (state, action) => {
      const { id, date, item, amount, description } = action.payload;
      state.expenses = state.expenses.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              date,
              item,
              amount,
              description,
            }
          : exp
      );
      localStorage.setItem(
        "expenses",
        JSON.stringify(state.expenses)
      );
    },
    totalMonthExpense: (state, action) => {
      state.totalMonth = action.payload;
    },
    displayExpense: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const {
  createExpense,
  deleteExpense,
  editExpense,
  totalMonthExpense,
  displayExpense,
} = expensesSlice.actions;
export default expensesSlice.reducer;
