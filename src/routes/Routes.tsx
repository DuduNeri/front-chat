// Routes.tsx
import Login from "../components/authentication/login/Login";
import Register from "../components/authentication/register/register";
import Home from "../components/chat/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function ChatRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default ChatRoutes;
