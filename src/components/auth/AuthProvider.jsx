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
    }
  }, []);

  // 로그인 함수: access을 로컬 스토리지에 저장하고, 로그인 상태로 설정
  const login = () => {};

  // 로그아웃 함수: access을 로컬 스토리지에서 제거하고,  로그아웃 상태로 설정
  const logout = () => {};

  return (
    // AuthContext.Provider를 통해 하위 컴포넌트에 로그인 상태와 함수 제공
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 AuthContext를 사용할 수 있도록 하는 훅
export const useAuth = () => useContext(AuthContext);
