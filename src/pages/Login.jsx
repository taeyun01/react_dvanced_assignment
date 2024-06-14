import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { displayUserInfo } from "../redux/slices/expensesSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );
      const data = response.data;
      // 로그인 성공시
      if (data.success) {
        login(data.accessToken);
        dispatch(displayUserInfo(data));
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <StLoginPage>
      <StH2>로그인</StH2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
        />
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <StyledButton type="submit">로그인</StyledButton>
      </StyledForm>
    </StLoginPage>
  );
};

const StLoginPage = styled.div`
  padding: 40px 0;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StH2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 20px auto;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #acc2ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #9ab2f1;
  }
`;

export default Login;
