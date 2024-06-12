import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ExpensesItem from "./ExpensesItem";
import { useSelector, useDispatch } from "react-redux";
import {
  displayExpense,
  totalMonthExpense,
} from "../redux/slices/expensesSlice";
import Margin from "./Margin";

const ExpensesList = () => {
  const [sortType, setSortType] = useState("latest");

  const { expenses, totalMonth } = useSelector(
    (state) => state.expenses
  );

  const dispatch = useDispatch();

  let monthNumber = totalMonth; // N월

  // 10미만은 0붙이기, 01 ~ 09
  if (Number(monthNumber) < 10) {
    monthNumber = `0${monthNumber}`;
  } else {
    monthNumber = monthNumber;
  }

  // 내가 선택한 N월 필터
  const monthFilter = expenses.filter(
    (mon) => mon.date.substring(5, 7) === String(monthNumber)
  );

  const getfilteredData = () => {
    // N 월 지출 총 합계
    const totalExpenses = monthFilter
      .map((exp) => Number(exp.amount))
      .reduce((acc, cur) => acc + cur, 0);

    // 날짜 비교하여 최신순, 오래된순으로 정렬
    // toSorted는 sort메서드랑 다르게 원본 배열은 보존하고 정렬된 새로운 배열을 반환함
    const sortedData = monthFilter.toSorted((a, b) =>
      sortType === "oldest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    return { totalExpenses, sortedData };
  };

  // 최신순, 오래된순 옵션 select선택 시
  const onChangeSort = (e) => {
    setSortType(e.target.value);
  };

  const { totalExpenses, sortedData } = getfilteredData();

  useEffect(() => {
    // N월 꺼내기
    const localSelectMonth = JSON.parse(
      localStorage.getItem("selectMonth")
    );

    // 지출 데이터 꺼내기
    const localExpData = JSON.parse(localStorage.getItem("expenses"));

    dispatch(totalMonthExpense(localSelectMonth));
    dispatch(displayExpense(localExpData));
  }, []);

  return (
    <>
      <TotalExpensesDiv>
        <h2>
          {totalMonth}월 총 지출 :{" "}
          {totalExpenses.toLocaleString("ko-KR")}원
        </h2>
      </TotalExpensesDiv>
      <Margin />
      <ExpensesListUl>
        {sortedData.length ? (
          <div>
            <Select onChange={onChangeSort}>
              <option value="latest">최신순</option>
              <option value="oldest">오래된 순</option>
            </Select>
          </div>
        ) : null}

        {sortedData.length ? (
          sortedData.map((exp) => (
            <ExpensesItem key={exp.id} {...exp} />
          ))
        ) : (
          <NoExpenses>지출이 없습니다.</NoExpenses>
        )}
      </ExpensesListUl>
    </>
  );
};

const ExpensesListUl = styled.ul`
  padding: 14px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const NoExpenses = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8b8b8b;
  padding: 20px;
`;

const TotalExpensesDiv = styled.div`
  padding: 14px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  &:hover {
    border-color: #007aff;
  }
  &:focus {
    border-color: #007aff;
  }
`;
export default ExpensesList;
