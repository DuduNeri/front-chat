import { Box, IconButton, Avatar, Tooltip, TextField } from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon, MicIcon, SendIcon
} from "lucide-react";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        overflow: "hidden",
      }}
    >
      {/* Barra lateral */}
      <Box
        sx={{
          width: 100,
          background: "rgba(30, 30, 46, 0.8)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          gap: 2,
        }}
      >
        <Tooltip title="Perfil">
          <IconButton
            sx={{
              width: 56,
              height: 56,
              border: "2px solid rgba(100, 200, 255, 0.6)",
              color: "rgba(100, 200, 255, 0.8)",
              "&:hover": {
                color: "rgba(100, 200, 255, 1)",
                borderColor: "rgba(100, 200, 255, 1)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "rgba(100, 200, 255, 0.2)",
                fontSize: "1.5rem",
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Ícones de chat (exemplo) */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((item) => (
            <Tooltip key={item} title={`Chat ${item}`}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(100, 200, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    background: "rgba(100, 200, 255, 0.2)",
                    color: "rgba(100, 200, 255, 0.8)",
                  },
                }}
              />
            </Tooltip>
          ))}
        </Box>

        {/* Botões inferiores */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Tooltip title="Página Inicial">
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": { color: "rgba(100, 200, 255, 0.8)" },
              }}
            >
              <HomeIcon size={24} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações">
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": { color: "rgba(100, 200, 255, 0.8)" },
              }}
            >
              <SettingsIcon size={24} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Sair">
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": { color: "rgba(255, 100, 100, 0.8)" },
              }}
            >
              <LogOutIcon size={24} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Área principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          pb: 3,
          px: 3,
        }}
      >
        {/* Campo de input de enviar */}
        <TextField
          multiline
          maxRows={4}
          placeholder="Digite sua mensagem..."
          fullWidth
          InputProps={{
            startAdornment: (
              <IconButton
                size="small"
                sx={{
                  mr: 1,
                  color: "rgba(100, 200, 255, 0.6)",
                  "&:hover": {
                    color: "rgba(100, 200, 255, 1)",
                  },
                }}
              >
                <MicIcon size={20} />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                size="small"
                
                sx={{
                  ml: 1,
                  color: "rgba(100, 200, 255, 0.6)",
                  "&:hover": {
                    color: "rgba(100, 200, 255, 1)",
                  },
                }}
              >
                <SendIcon size={20} />
              </IconButton>
            ),
          }}
          sx={{
            width: "50%",
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              border: "1px solid rgba(100, 200, 255, 0.3)",
              transition: "all 0.3s ease",
              "& fieldset": {
                borderColor: "rgba(100, 200, 255, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(100, 200, 255, 0.6)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(100, 200, 255, 1)",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "12px 16px",
              fontSize: "0.95rem",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "rgba(255, 255, 255, 0.4)",
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
