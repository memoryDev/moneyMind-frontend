import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({});

// Request Interceptors: 모든 요청에 Access 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 Access 토큰 조회
    const token = localStorage.getItem("access");

    // 토큰이 있을 경우, 요청 헤더에 토큰을 추가
    if (token) {
      config.headers["access"] = token;
    }

    // 변경된 설정 반환(토큰이 추가된 요청)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 401 에러 시 토큰 재발급 시도
apiClient.interceptors.response.use(
  // 응답이 성공적으로 이루어지면 그대로 반환
  (response) => {
    return response;
  },
  async (error) => {
    // 원래의 요청 정보를 저장
    const originalRequest = error.config;

    // 401 && 403에러가 발생하고, 요청이 처음 시도된 것일 때만 실행
    if (
      error.response.status === 401 ||
      (error.response.status === 403 && !originalRequest._retry)
    ) {
      // 중복된 요청 방지
      originalRequest._retry = true;

      try {
        // /api/reissue 토큰 재발급 요청
        const reissueResponse = await axios.post("/api/reissue");

        // 새로 발급 받은 Access 토큰 헤더에서 가져옴
        const newAccessToken = reissueResponse.headers["access"];

        // 원래 요청에 새로 발급받은 Access 토큰을 추가
        originalRequest.headers["access"] = newAccessToken;

        // 로컬 스토리지에 새로운 Access 토큰을 저장
        localStorage.setItem("access", newAccessToken);

        // 토큰이 갱싱된 원래의 요청을 다시 시도
        return apiClient(originalRequest);
      } catch (reissueError) {
        // 토큰 재발급 실패 시, 오류 반환
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
