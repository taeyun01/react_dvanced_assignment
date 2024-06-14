import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { totalMonthExpense } from "../redux/slices/expensesSlice";
import useApiQuery from "../hooks/useApiQuery";
import useLoadingError from "../hooks/useLoadingError";

const SelectMonth = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();

  const {
    data: month,
    isPending: isFetchingMonth,
    isError: isErrorMonth,
  } = useApiQuery("month", "/month");

  // 1월~12월 버튼 클릭시
  const selectMonthActive = async (id) => {
    setActiveIndex(id);
    dispatch(totalMonthExpense(id));
    localStorage.setItem("selectMonth", JSON.stringify(id));
  };

  // 월 버튼 활성화 유지
  useEffect(() => {
    const selectMonth = JSON.parse(
      localStorage.getItem("selectMonth")
    );
    setActiveIndex(selectMonth);
  }, []);

  const loadingOrErrorComponent = useLoadingError(
    isFetchingMonth,
    isErrorMonth,
    "데이터를 불러오는 중 에러가 발생했습니다."
  );
  if (loadingOrErrorComponent) return loadingOrErrorComponent;

  return (
    <div>
      <SelectMonthDiv>
        {month.map((mon) => (
          <MonthItemDiv
            key={mon.number}
            $active={+activeIndex === +mon.number}
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
