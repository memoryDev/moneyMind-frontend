import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/Error/NotFound";
import Header from "./components/Header";
import "./styles/reset.min.css";
import { AuthProvider } from "./components/auth/AuthProvider";
import SignUp from "./pages/\bSignup/SignUp";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import CategoryManagerPage from "./pages/Category/CategoryManagerPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* ===== 비로그인 ===== */}
            <Route path="/" element={<PublicRoute element={Home} />} />

            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/login"
              element={
                <PublicRoute restricted={true}>
                  <Login />
                </PublicRoute>
              }
            ></Route>

            <Route
              path="/signup"
              element={
                <PublicRoute restricted={true}>
                  <SignUp />
                </PublicRoute>
              }
            ></Route>

            {/* ===== 로그인 ===== */}
            <Route
              path="/category"
              element={
                <PrivateRoute>
                  <CategoryManagerPage />
                </PrivateRoute>
              }
            ></Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
