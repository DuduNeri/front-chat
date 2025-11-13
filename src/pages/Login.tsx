import { Link as RouterLink } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { loginUser } from "../api/auth/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const data = response.data;
      console.log("Sucesso ao logar no sistema👽",data)
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error("❌ Erro ao logar:", error);
      alert("E-mail ou senha incorretos!");
    }
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        "@media (max-width: 600px)": { padding: 2 },
      }}
    >
      <Paper
        elevation={20}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: 3,
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px rgba(255, 255, 255, 0.1)",
          animation: "fadeIn 0.6s ease-in-out",
          background:
            "linear-gradient(135deg, rgba(30, 30, 46, 0.95) 0%, rgba(20, 20, 35, 0.95) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          "@media (max-width: 600px)": { maxWidth: "100%", p: 3 },
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 1,
            color: "#fff",
            fontWeight: 700,
            letterSpacing: 0.5,
            fontSize: { xs: "1.8rem", sm: "2rem" },
          }}
        >
          Bem-vindo
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Faça login em sua conta
        </Typography>

        <form>
          {/* EMAIL */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)", fontWeight: 500 } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(100, 200, 255, 0.6)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(100, 200, 255, 1)" },
              },
              "& .MuiOutlinedInput-input": { padding: "14px 16px", fontSize: "1rem" },
              "& .MuiOutlinedInput-input::placeholder": { color: "rgba(255,255,255,0.4)" },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SENHA */}
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)", fontWeight: 500 } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s ease",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(100, 200, 255, 0.6)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(100, 200, 255, 1)" },
              },
              "& .MuiOutlinedInput-input": { padding: "14px 16px", fontSize: "1rem" },
            }}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* BOTÃO ENTRAR */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(135deg, #64c8ff 0%, #3a9fd8 100%)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 2,
              fontSize: "1rem",
              textTransform: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(100,200,255,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #7dd9ff 0%, #4bb0ff 100%)",
                boxShadow: "0 8px 30px rgba(100,200,255,0.5)",
                transform: "translateY(-2px)",
              },
              "&:active": { transform: "translateY(0)" },
            }}
            onClick={handleLogin}
          >
            Entrar
          </Button>

          {/* LINK CADASTRO */}
          <Link
            component={RouterLink}
            to="/register"
            sx={{
              display: "block",
              mt: 3,
              textAlign: "center",
              color: "rgba(100,200,255,0.8)",
              textDecoration: "none",
              "&:hover": { color: "rgba(100,200,255,1)" },
            }}
          >
            Ainda não tem uma conta? Cadastre-se
          </Link>

          {/* LINK ESQUECEU SENHA */}
          <Link
            href="#"
            sx={{
              display: "block",
              mt: 2,
              textAlign: "center",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: "0.9rem",
              "&:hover": { color: "rgba(255,255,255,0.8)" },
            }}
          >
            Esqueceu a senha?
          </Link>
        </form>
      </Paper>

      {/* ANIMAÇÃO FADE IN */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        `}
      </style>
    </Box>
  );
};

export default Login;
