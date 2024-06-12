import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createExpense } from "../redux/slices/expensesSlice";

const ExpensesForm = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // 내가 입력한 input name이 date면, 내가 입력한 값으로 상태변경
    });
  };

  // 인풋 입력 후 저장버튼 클릭 시 실행
  const createExpenses = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (
      input.date === "" ||
      input.item === "" ||
      input.amount === "" ||
      input.description === ""
    ) {
      return alert("내용을 모두 입력해주세요!");
    }

    // 지출내역 생성 action 전달
    dispatch(
      createExpense({
        id: uuidv4(),
        date: input.date,
        item: input.item,
        amount: input.amount,
        description: input.description,
      })
    );

    setInput({
      ...input,
      date: "",
      item: "",
      amount: "",
      description: "",
    });
  };

  return (
    <FormContainer onSubmit={createExpenses}>
      <InputBox>
        <label htmlFor="date">날짜</label>
        <Input
          type="date"
          id="date"
          name="date"
          value={input.date}
          onChange={onChange}
        />
      </InputBox>
      <InputBox>
        <label htmlFor="item">항목</label>
        <Input
          type="text"
          id="item"
          name="item"
          value={input.item}
          onChange={onChange}
          placeholder="지출 항목"
        />
      </InputBox>
      <InputBox>
        <label htmlFor="amount">금액</label>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={input.amount}
          onChange={onChange}
          placeholder="지출 금액"
        />
      </InputBox>
      <InputBox>
        <label htmlFor="description">내용</label>
        <Input
          type="text"
          id="description"
          name="description"
          value={input.description}
          onChange={onChange}
          placeholder="지출 내용"
        />
      </InputBox>
      <Button>저장</Button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;
  padding: 14px 12px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  flex-wrap: wrap;
  gap: 15px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid;
  padding: 8px 6px;
`;

const Button = styled.button`
  padding: 6px 18px;
  border: none;
  background-color: #81adff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

export default ExpensesForm;
