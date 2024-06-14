import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  displayUserInfo,
  displayUserInfoChange,
  updateAvatarUrl,
} from "../redux/slices/expensesSlice";
import styled from "styled-components";

const MyPage = () => {
  const [newNickname, setNewNickname] = useState("");
  const [imgfile, setImgfile] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const { userInfo } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          // 먼저 스토리지에서 토큰을 받아옴, 로그인된 사용자인지 확인
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(displayUserInfo(response.data));
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();
    try {
      // 스토리지에서 토큰을 가져와 확인, 로그인된 사용자인지 확인
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", newNickname); // 새 닉네임

      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 응답이 정상적으로 올 때, 닉네임 변경 성공할 때
      if (response.data.success) {
        // 유저정보를 바꿔줌
        dispatch(displayUserInfoChange(response.data));
        alert("닉네임이 변경되었습니다.");
        setNewNickname("");
      } else {
        alert("닉네임 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update nickname:", error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("avatar", imgfile); // 이미지 파일

      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        dispatch(updateAvatarUrl(response.data.avatar));
        alert("프로필이 업데이트 되었습니다.");
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  // 유저정보를 가져오는 중일 때
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <StDiv>
      <StH2>프로필</StH2>
      <p>아이디 : {userInfo.id}</p>
      <p>닉네임 : {userInfo.nickname}</p>

      <form onSubmit={handleNicknameChange}>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="새 닉네임"
        />
        <button type="submit">닉네임 변경</button>
      </form>
      <form onSubmit={handleImageChange}>
        <input
          type="file"
          onChange={(e) => setImgfile(e.target.files[0])}
          placeholder="프로필 이미지 변경"
        />
        <button type="submit">이미지 변경</button>
      </form>
      {/* <Img src={`${imgfile}`} alt="" /> */}
    </StDiv>
  );
};

const StDiv = styled.div`
  padding: 30px 24px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const StH2 = styled.h2`
  font-weight: bold;
  font-size: 24px;
`;

export default MyPage;
