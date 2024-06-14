// 설명: 회원가입을 위한 페이지입니다.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );
      const data = response.data;
      if (data.success) {
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
    }
  };

  return (
    <StSignupPage>
      <StH2>회원가입</StH2>
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
        <StyledInput
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
        />
        <StyledButton type="submit">회원가입</StyledButton>
      </StyledForm>
    </StSignupPage>
  );
};

const StSignupPage = styled.div`
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

export default Signup;
