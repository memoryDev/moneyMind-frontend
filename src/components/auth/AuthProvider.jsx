import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

// 인증 관련 정보를 공유하기 위한 Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 로그인 상태를 관리하기 위한 상태 변수
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 실행
  useEffect(() => {
    // 로컬 스토리지에 access 가져오기
    const accessToken = localStorage.getItem("access");

    // access이 존재하면 로그인 상태로 전환
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // 로그인 함수: access을 로컬 스토리지에 저장하고, 로그인 상태로 설정
  const login = async (userid, password) => {
    try {
      const formData = new FormData();
      formData.append("userid", userid);
      formData.append("password", password);

      const response = await axios.post("/api/login", formData);

      if (response.status !== 200) {
        alert("API 통신에 실패 하였습니다.");
        return false;
      }

      const accessToken = response.headers.access;

      if (!accessToken) {
        alert("로그인에 실패하였습니다");
        return false;
      }

      localStorage.setItem("access", accessToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      alert("로그인 정보가 일치하지 않습니다. 다시 시도해 주세요.");
      console.error(error);
      return false;
    }
  };

  // 로그아웃 함수: access을 로컬 스토리지에서 제거하고,  로그아웃 상태로 설정
  const logout = async () => {
    const url = "/api/logout";
    const data = {
      access: localStorage.getItem("access"),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        access: localStorage.getItem("access"),
      },
      withCredentials: true,
    };

    const response = await axios.post(url, data, config);

    if (response.status !== 200) {
      alert("로그아웃에 실패하였습니다.");
      return false;
    }

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
      {children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 AuthContext를 사용할 수 있도록 하는 훅
export const useAuth = () => useContext(AuthContext);
