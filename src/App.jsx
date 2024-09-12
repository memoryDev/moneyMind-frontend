import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/Error/NotFound";
import Header from "./components/Header";
import "./styles/reset.min.css";
import { AuthProvider } from "./components/auth/AuthProvider";
import SignUp from "./pages/\bSignup/SignUp";
import CategoryManager from "./pages/Category/CategoryManager";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* ===== 비로그인 ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />}></Route>

            {/* ===== 로그인 ===== */}
            <Route
              path="/category"
              element={
                <PrivateRoute component={CategoryManager}></PrivateRoute>
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
