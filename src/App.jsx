import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/Error/NotFound";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import "./styles/reset.min.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
