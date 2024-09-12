import React, { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
// 인증 상태를 확인하기 위해 AuthProvider에서 useAuth 훅 import
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  // 현재 로그인 상태 조회
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 인증 상태 결정되기 전까지 대기
  if (isAuthenticated === null) {
    return;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
