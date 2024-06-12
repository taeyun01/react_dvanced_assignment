import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ExpensesItem = ({ id, date, item, amount, description }) => {
  const nav = useNavigate();

  const detailPageMove = (id) => {
    nav(`/detail/${id}`);
  };

  return (
    <>
      <ExpensesItemtLi onClick={() => detailPageMove(id)}>
        <ItemtDiv>
          <p>{date}</p>
          <ItemtP>
            {item} - {description}
          </ItemtP>
        </ItemtDiv>
        <AmountDiv>
          <p>{Number(amount).toLocaleString("ko-KR")} 원</p>
        </AmountDiv>
      </ExpensesItemtLi>
    </>
  );
};

const ExpensesItemtLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  cursor: pointer;

  &:hover {
    border: 1px solid #007aff;
  }
`;

const ItemtDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 10px;
`;

const AmountDiv = styled.div`
  margin-left: 8px;
  text-align: end;
  width: 20%;
`;

const ItemtP = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default ExpensesItem;
