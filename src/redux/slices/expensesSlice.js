import { createSlice } from "@reduxjs/toolkit";
// import { TEST_DATA } from "../../constants/testData";

localStorage.getItem("selectMonth")
  ? JSON.parse(localStorage.getItem("selectMonth"))
  : localStorage.setItem("selectMonth", JSON.stringify("1"));

const initialState = {
  userInfo: null,
  totalMonth: "",
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    totalMonthExpense: (state, action) => {
      state.totalMonth = action.payload;
    },
    displayUserInfo: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
    displayUserInfoChange: (state, action) => {
      console.log(action.payload);
      state.userInfo = {
        ...state.userInfo,
        nickname: action.payload.nickname,
      };
    },
    updateAvatarUrl: (state, action) => {
      state.userInfo = { ...state.userInfo, avatar: action.payload };
    },
  },
});

export const {
  totalMonthExpense,
  displayUserInfo,
  displayUserInfoChange,
  updateAvatarUrl,
} = expensesSlice.actions;
export default expensesSlice.reducer;
