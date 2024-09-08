import React, { Component } from "react";
import { Navigate } from "react-router-dom";
// 인증 상태를 확인하기 위해 AuthProvider에서 useAuth 훅 import
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ component, ...rest }) => {
  // 현재 로그인 상태 조회
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
