// Routes.tsx
import Login from "../components/auth/login/Login";
import Register from "../components/auth/register/register";
import Home from "../components/chat/Home";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

function ChatRoutes() {
  // ✅ letra maiúscula
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default ChatRoutes;
