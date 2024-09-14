const handleApiError = (status) => {
  // 서버가 응답을 하지 않았을시
  console.log(status);
  if (status !== 200) {
    alert("API 통신에 실패 하였습니다.");
    return false;
  }
};

export default handleApiError;
