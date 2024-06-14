// - 설명: 인증 및 인가 상태를 관리하는 컨텍스트 파일입니다.
// - 기능:
//     - 로그인 상태 관리
//     - 로그인/로그아웃 함수 제공
//     - Access token 관리
import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken"); // accessToken이 존재 하는지 확인

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // 로그인 돼있는지? accessToken 있는지

  // 로그인 되면 토큰을 인자로 받아 저장
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  // 로그아웃시 토큰 삭제
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
