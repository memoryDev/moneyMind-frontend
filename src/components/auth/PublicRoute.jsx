import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, restricted }) => {
  const { isAuthenticated } = useAuth();

  // 인증상태 아직 결정되지 않았으면 대기
  if (isAuthenticated == null) {
    return;
  }

  return isAuthenticated && restricted ? <Navigate to="/" /> : children;
};

export default PublicRoute;
