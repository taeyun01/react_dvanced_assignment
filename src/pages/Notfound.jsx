import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Notfound = () => {
  return (
    <NotfoundContainer>
      <h2>잘못된 페이지 입니다.</h2>
      <Link to={"/"}>홈으로 돌아가기</Link>
    </NotfoundContainer>
  );
};

const NotfoundContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  gap: 15px;
`;

export default Notfound;
