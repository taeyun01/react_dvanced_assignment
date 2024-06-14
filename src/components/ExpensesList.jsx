import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Margin from "./Margin";
import ExpensesItem from "./ExpensesItem";
import useApiQuery from "../hooks/useApiQuery";
import { totalMonthExpense } from "../redux/slices/expensesSlice";
import useLoadingError from "../hooks/useLoadingError";

const ExpensesList = () => {
  const [sortType, setSortType] = useState("latest");
  const { totalMonth } = useSelector((state) => state.expenses);

  const {
    data: expenses,
    isPending: isFetchingExpenses,
    isError: isErrorExpenses,
  } = useApiQuery("expenses", "/expenses");

  const dispatch = useDispatch();

  let monthNumber = totalMonth; // N월

  // 10미만은 0붙이기, 01 ~ 09
  if (Number(monthNumber) < 10) {
    monthNumber = `0${monthNumber}`;
  } else {
    monthNumber = `${monthNumber}`;
  }

  // 내가 선택한 N월 필터
  const monthFilter = expenses?.filter(
    (mon) => mon.date.substring(5, 7) === String(monthNumber)
  );

  const getfilteredData = () => {
    // N 월 지출 총 합계
    const totalExpenses = monthFilter
      ?.map((exp) => Number(exp.amount))
      .reduce((acc, cur) => acc + cur, 0);

    // 날짜 비교하여 최신순, 오래된순으로 정렬, toSorted -> 원본 배열 보존 정렬
    const sortedData = monthFilter?.toSorted((a, b) =>
      sortType === "oldest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    return { totalExpenses, sortedData };
  };

  const { totalExpenses, sortedData } = getfilteredData();

  // 최신순, 오래된순 옵션 select선택 시
  const onChangeSort = (e) => {
    setSortType(e.target.value);
  };

  useEffect(() => {
    const localSelectMonth = JSON.parse(
      localStorage.getItem("selectMonth")
    );

    dispatch(totalMonthExpense(localSelectMonth));
  }, []);

  const loadingOrErrorComponent = useLoadingError(
    isFetchingExpenses,
    isErrorExpenses,
    "데이터를 불러오는 중 에러가 발생했습니다."
  );
  if (loadingOrErrorComponent) return loadingOrErrorComponent;

  return (
    <>
      <TotalExpensesDiv>
        <h2>
          {totalMonth && totalMonth}월 총 지출 :{" "}
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
