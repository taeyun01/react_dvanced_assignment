import { useContext, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jsonApi } from "../api/axios";

const ExpensesForm = () => {
  const [input, setInput] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });

  // const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.expenses);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const addTodo = async (newTodo) => {
    await jsonApi.post(`/expenses`, newTodo);
  };

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]); // queryKey가 유효하지 않을때는(item이 늘어나거나 줄어들 때) invalidateQueries고 반드시 queryKey를 넣어줘야함
    },
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // 내가 입력한 input name이 date면, 내가 입력한 값으로 상태변경
    });
  };

  const createExpenses = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (
      input.date === "" ||
      input.item === "" ||
      input.amount === "" ||
      input.description === ""
    ) {
      return alert("내용을 모두 입력해주세요!");
    }

    const newExpenses = {
      date: input.date,
      item: input.item,
      amount: input.amount,
      description: input.description,
      userId: userInfo.id,
      userName: userInfo.nickname,
    };

    mutate(newExpenses);

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
