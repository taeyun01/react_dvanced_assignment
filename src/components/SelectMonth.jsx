import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { totalMonthExpense } from "../redux/slices/expensesSlice";

const SelectMonth = () => {
  const { month } = useSelector((state) => state.expenses); // 월 데이터
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);

  // 1월~12월 버튼 클릭시 실행
  const selectMonthActive = (id) => {
    setActiveIndex(id);
    dispatch(totalMonthExpense(id));
    localStorage.setItem("selectMonth", JSON.stringify(id));
  };

  // 새로고침시 버튼 활성화 유지
  useEffect(() => {
    // N월 가져오기
    const selectMonth = JSON.parse(
      localStorage.getItem("selectMonth")
    );
    setActiveIndex(selectMonth);
  }, []);

  return (
    <div>
      <SelectMonthDiv>
        {month.map((mon) => (
          <MonthItemDiv
            key={mon.number}
            $active={activeIndex === mon.number}
            onClick={() => selectMonthActive(mon.number)}
          >
            {mon.number}월
          </MonthItemDiv>
        ))}
      </SelectMonthDiv>
    </div>
  );
};

const SelectMonthDiv = styled.div`
  width: 100%;
  padding: 14px 12px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
`;

const MonthItemDiv = styled.div`
  text-align: center;
  padding: 20px;
  width: 100px;
  height: 60px;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.$active ? "#81adff" : "#eeeeee"};
  color: ${(props) => (props.$active ? "white" : "black")};
  border-radius: 6px;
  &:hover {
    background-color: #81adff;
    color: white;
    transition: 0.3s;
  }
`;

export default SelectMonth;
