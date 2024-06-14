import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { jsonApi } from "../api/axios";
import useLoadingError from "../hooks/useLoadingError";
import useApiQuery from "../hooks/useApiQuery";

const Detail = () => {
  const { userInfo } = useSelector((state) => state.expenses);

  const {
    data: expenses,
    isPending: isFetchingExpenses,
    isError: isErrorExpenses,
  } = useApiQuery("expenses", "/expenses");

  const { id } = useParams();
  const navigate = useNavigate();
  const dateRef = useRef("");
  const itemRef = useRef("");
  const amountRef = useRef("");
  const descriptionRef = useRef("");

  const onClickEdit = async () => {
    if (window.confirm("수정 하시겠습니까?")) {
      const editExpenses = {
        id,
        date: dateRef.current.value,
        item: itemRef.current.value,
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
      };
      await jsonApi.patch(`/expenses/${id}`, editExpenses);
      navigate("/");
    }
  };

  const onClickDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await jsonApi.delete(`/expenses/${id}`);
      navigate("/", { replace: true });
    }
  };

  // 항목 아이템 클릭한 id와 expenses의 id 값이랑 같은거 가져오기
  const detailFilter = expenses?.filter((exp) => exp.id === id)[0];
  const { date, item, amount, description, userId } = detailFilter;

  useEffect(() => {
    if (!userInfo) {
      alert("사용자 정보를 불러올 수 없습니다.");
      navigate("/");
      return;
    }

    if (userId !== userInfo.userId && userId !== userInfo.id) {
      alert("본인이 작성한 내역만 수정할 수 있습니다.");
      navigate("/");
      return;
    }

    dateRef.current.value = date;
    itemRef.current.value = item;
    amountRef.current.value = amount;
    descriptionRef.current.value = description;
  }, [expenses, navigate, userInfo]);

  const loadingOrErrorComponent = useLoadingError(
    isFetchingExpenses,
    isErrorExpenses,
    "데이터를 불러오는 중 에러가 발생했습니다."
  );

  if (loadingOrErrorComponent) return loadingOrErrorComponent;

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <DetailContainer>
      <StyledUserInfo>
        {userInfo
          ? `"${userInfo.nickname}"님의 지출내역 수정`
          : "Loading..."}
      </StyledUserInfo>
      <DtailBox>
        <InputBox>
          <label htmlFor="date">날짜</label>
          <Input
            ref={dateRef}
            value={dateRef.current.value}
            id="date"
            type="date"
          />
        </InputBox>
        <InputBox>
          <label htmlFor="item">항목</label>
          <Input
            ref={itemRef}
            value={itemRef.current.value}
            id="item"
            type="text"
          />
        </InputBox>
        <InputBox>
          <label htmlFor="amount">금액</label>
          <Input
            ref={amountRef}
            value={amountRef.current.value}
            id="amount"
            type="number"
          />
        </InputBox>
        <InputBox>
          <label htmlFor="description">내용</label>
          <Input
            ref={descriptionRef}
            value={descriptionRef.current.value}
            id="description"
            type="text"
          />
        </InputBox>
        <ButtonBox>
          <Button
            $color={"#AEB3FF"}
            $hover={"#969ceb"}
            onClick={onClickEdit}
          >
            수정
          </Button>
          <Button
            $color={"#ff6e90"}
            $hover={"#ff4d76"}
            onClick={onClickDelete}
          >
            삭제
          </Button>
          <Button
            $color={"#c5c5c5"}
            $hover={"#b8b4b4"}
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </Button>
        </ButtonBox>
      </DtailBox>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DtailBox = styled.div`
  width: 100%;
  padding: 14px 12px;
  border: 2px solid #acc2ff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid;
  padding: 5px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 6px 18px;
  border: none;
  background-color: ${(props) => props.$color};
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.$hover};
  }
`;

const StyledUserInfo = styled.p`
  margin: 10px;
`;

export default Detail;
