## 튜터님 피드백 일부분 적용

- (완료) slice 에서 action creator 를 작명하실 때 createReducer 라고 작명하시기보다는 createExpense 처럼 어떤 의도로 상태를 변경할지를 보다 semantic 하게 작명해주시는 것을 권장 드립니다.

- (미완료) - useEffect(() => {
  // N월 가져오기
  const selectMonth = JSON.parse(
  localStorage.getItem("selectMonth")
  );
  dispatch(totalMonthReducer(selectMonth));
  }, []);
  위 코드처럼 마운팅 이후 useEffect에서 로컬스토리지에 접근해서 그 값으로 상태변경하는 코드보다는 expensesSlice에서 initialState 할당 시에 로컬스토리지값이 있으면 그 값을 초기상태로 하고 없으면 null 을 할당하는 방식으로 고쳐보시면 useEffect 자체가 필요없게 됩니다. side effect 코드를 다루는 useEffect 훅은 사용하지 않을 수 있으면 최대한 사용하지 않는 것이 좋습니다.

- (완료) ExpensesList.jsx 의 testData 와 같은 상수형 데이터는 대문자로 const TEST_DATA = [...]; 로 해주시고 src/constants/ 폴더안에서 별도로 관리해주시는 것을 권장 드립니다. 함수 컴포넌트를 깔끔하게 정리하는 것 역시 리팩터링의 범주에 포함됩니다.
