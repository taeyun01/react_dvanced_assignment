import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayUserInfo } from "../redux/slices/expensesSlice";
import axios from "axios";
import styled from "styled-components";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { userInfo } = useSelector((state) => state.expenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "정말로 로그아웃 하시겠습니까?"
    );
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      // 먼저 스토리지에서 토큰을 받아옴, 로그인된 사용자인지 확인
      const token = localStorage.getItem("accessToken");
      if (token) {
        const response = await axios.get(
          "https://moneyfulpublicpolicy.co.kr/user",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(displayUserInfo(response.data));
      }
      if (!token) return console.log("토큰이 없습니다.");
    };
    fetchUserInfo();
  }, []);

  // 유저정보를 가져오는 중일 때
  // if (!userInfo) {
  //   return <Loading />;
  // }

  return (
    <HeaderDiv>
      <StH1>
        <StyledLink to="/">Home</StyledLink>
      </StH1>
      <NavDiv>
        {isAuthenticated ? (
          <>
            <StprofiledImg
              src={
                userInfo && userInfo.avatar
                  ? userInfo.avatar
                  : "src\\assets\\default-profile.jpg"
              }
              alt="프로필 이미지"
            ></StprofiledImg>
            <span>{userInfo ? userInfo.nickname : "Loading..."}</span>
            <StLink to={"/mypage"}>프로필</StLink>

            <StLink onClick={handleLogout}>로그아웃</StLink>
          </>
        ) : (
          <>
            <StLink to="/login">로그인</StLink>
            <StLink to="/signup">회원가입</StLink>
          </>
        )}
      </NavDiv>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  padding: 14px 24px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 30px;
  font-weight: bold;
`;
const StLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const StH1 = styled.h2`
  color: #acc2ff;
`;

const StprofiledImg = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export default Header;
