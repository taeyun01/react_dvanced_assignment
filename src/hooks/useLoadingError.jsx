const useLoadingError = (isFetching, isError, errorMessage) => {
  if (isFetching) {
    return <h2>로딩중...</h2>;
  }

  if (isError) {
    return <h2>{errorMessage}</h2>;
  }
  return null;
};

export default useLoadingError;
