import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

// 인증 관련 정보를 공유하기 위한 Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 로그인 상태를 관리하기 위한 상태 변수
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    const checkAuth = async () => {
      // 로컬 스토리지에 access 가져오기
      const accessToken = localStorage.getItem("access");

      // access이 존재하면 로그인 상태로 전환
      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        // access 토큰이 존재하지 않으면 로그아웃 상태로 전환
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * 로그인 함수
   * @param {string} userid - 사용자 ID
   * @param {string} password - 사용자 비밀번호
   * @returns {boolean} - 로그인 성공 여부
   */
  const login = async (userid, password) => {
    try {
      // 로그인 정보를 FormData로 준비
      const formData = new FormData();
      formData.append("userid", userid);
      formData.append("password", password);

      // 로그인 API 호출
      const response = await axios.post("/api/login", formData);

      // API 통신이 성공하지 않으면
      if (response.status !== 200) {
        alert("API 통신에 실패 하였습니다.");
        return false;
      }

      // 응답 헤더에서 access 토큰 가져오기
      const accessToken = response.headers.access;

      // access 토큰이 없으면 로그인 실패
      if (!accessToken) {
        alert("로그인에 실패하였습니다");
        return false;
      }

      // 로컬 스토리지에 JWT 토큰 저장
      localStorage.setItem("access", accessToken);

      // 로그인 상태로 설정
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      alert("로그인 정보가 일치하지 않습니다. 다시 시도해 주세요.");
      console.error(error);
      return false;
    }
  };

  /**
   * 로그아웃 함수
   * @returns {boolean} - 로그아웃 성공 여부
   */
  const logout = async () => {
    const url = "/api/logout";
    const data = {
      access: localStorage.getItem("access"),
    };

    // 요청헤더에 access 토큰 추가
    const config = {
      headers: {
        "Content-Type": "application/json",
        access: localStorage.getItem("access"),
      },
      // 쿠키도 함께 전송
      withCredentials: true,
    };

    // 로그아웃 API 호출
    const response = await axios.post(url, data, config);

    // API 통신 성공하지 못했을시
    if (response.status !== 200) {
      alert("로그아웃에 실패하였습니다.");
      return false;
    }

    // 로그아웃 상태로 설정
    setIsAuthenticated(false);

    // 클라이언트에서 access token 삭제
    localStorage.removeItem("access");

    // 쿠키에서 refresh 제거
    document.cookie = "refresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    return true;
  };

  return (
    // AuthContext.Provider를 통해 하위 컴포넌트에 로그인 상태와 함수 제공
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {/* 인증 상태가 결정 될때까지 대기 */}
      {isAuthenticated === null ? "" : children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 AuthContext를 사용할 수 있도록 하는 훅
export const useAuth = () => useContext(AuthContext);
