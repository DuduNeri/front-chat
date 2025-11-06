import { Box, IconButton, Avatar, Tooltip, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  Plus as PlusIcon,
  X as XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  isMobile: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const Sidebar = ({ isMobile, setSidebarOpen }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: isMobile ? "100%" : 100,
          background:
            "linear-gradient(180deg, rgba(30, 30, 46, 0.95) 0%, rgba(25, 25, 40, 0.95) 100%)",
          borderRight: isMobile
            ? "none"
            : "1px solid rgba(100, 200, 255, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "flex-start" : "center",
          py: isMobile ? 2 : 3,
          px: isMobile ? 2 : 0,
          gap: isMobile ? 1 : 2,
          height: "100%",
          overflowY: "auto",
        }}
      >
        {isMobile && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: 0.5,
              }}
            >
              Menu
            </Typography>
            <IconButton
              size="small"
              onClick={() => setSidebarOpen?.(false)}
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                transition: "all 0.2s",
                p: 0.5,
              }}
            >
              <XIcon size={18} />
            </IconButton>
          </Box>
        )}

        <Tooltip title="Perfil" placement="right">
          <IconButton
            sx={{
              width: isMobile ? "100%" : 56,
              height: isMobile ? 44 : 56,
              borderRadius: isMobile ? 12 : "50%",
              background:
                "linear-gradient(135deg, rgba(100, 200, 255, 0.15) 0%, rgba(100, 150, 220, 0.1) 100%)",
              border: "1.5px solid rgba(100, 200, 255, 0.4)",
              justifyContent: isMobile ? "flex-start" : "center",
              pl: isMobile ? 1.5 : 0,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(100, 200, 255, 0.25) 0%, rgba(100, 150, 220, 0.2) 100%)",
                borderColor: "rgba(100, 200, 255, 0.7)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(100, 200, 255, 0.2)",
              },
            }}
          >
            <Avatar
              sx={{
                width: isMobile ? 36 : 40,
                height: isMobile ? 36 : 40,
                background:
                  "linear-gradient(135deg, rgba(100, 200, 255, 0.3), rgba(80, 180, 220, 0.2))",
                fontSize: isMobile ? "0.9rem" : "1rem",
                fontWeight: 700,
                mr: isMobile ? 1.5 : 0,
                color: "#fff",
              }}
            >
              U
            </Avatar>
            {isMobile && (
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.9)",
                  ml: 1,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                Perfil
              </Typography>
            )}
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 1 : 2,
            width: isMobile ? "100%" : "auto",
          }}
        >
          {[1, 2, 3].map((item) => (
            <Tooltip key={item} title={`Chat ${item}`} placement="right">
              <IconButton
                sx={{
                  width: isMobile ? "100%" : 48,
                  height: isMobile ? 40 : 48,
                  borderRadius: isMobile ? 12 : "50%",
                  background: "rgba(100, 200, 255, 0.08)",
                  border: "1px solid rgba(100, 200, 255, 0.2)",
                  justifyContent: isMobile ? "flex-start" : "center",
                  pl: isMobile ? 1.5 : 0,
                  transition: "all 0.3s",
                  "&:hover": {
                    background: "rgba(100, 200, 255, 0.15)",
                    borderColor: "rgba(100, 200, 255, 0.5)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: isMobile ? 10 : 12,
                    height: isMobile ? 10 : 12,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(100, 200, 255, 0.6), rgba(100, 180, 240, 0.4))",
                    mr: isMobile ? 1.5 : 0,
                    boxShadow: "0 0 12px rgba(100, 200, 255, 0.3)",
                  }}
                />
                {isMobile && (
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    Chat {item}
                  </Typography>
                )}
              </IconButton>
            </Tooltip>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 0.75 : 2,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Tooltip title="Criar chat" placement="right">
            <IconButton
              sx={{
                width: isMobile ? "100%" : "auto",
                height: isMobile ? 40 : "auto",
                justifyContent: isMobile ? "flex-start" : "center",
                pl: isMobile ? 1.5 : 0,
                color: "rgba(100, 200, 255, 0.7)",
                "&:hover": { color: "rgba(100, 200, 255, 1)" },
              }}
            >
              <PlusIcon size={isMobile ? 20 : 24} />
              {isMobile && (
                <Typography
                  sx={{
                    color: "rgba(100, 200, 255, 0.8)",
                    ml: 1.5,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  Novo
                </Typography>
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Página Inicial" placement="right">
            <IconButton
              sx={{
                width: isMobile ? "100%" : "auto",
                height: isMobile ? 40 : "auto",
                justifyContent: isMobile ? "flex-start" : "center",
                pl: isMobile ? 1.5 : 0,
                color: "rgba(150, 150, 180, 0.7)",
                "&:hover": { color: "rgba(100, 200, 255, 0.9)" },
              }}
            >
              <HomeIcon size={isMobile ? 20 : 24} />
              {isMobile && (
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    ml: 1.5,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  Home
                </Typography>
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações" placement="right">
            <IconButton
              sx={{
                width: isMobile ? "100%" : "auto",
                height: isMobile ? 40 : "auto",
                justifyContent: isMobile ? "flex-start" : "center",
                pl: isMobile ? 1.5 : 0,
                color: "rgba(150, 150, 180, 0.7)",
                "&:hover": { color: "rgba(100, 200, 255, 0.9)" },
              }}
            >
              <SettingsIcon size={isMobile ? 20 : 24} />
              {isMobile && (
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    ml: 1.5,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  Ajustes
                </Typography>
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Sair" placement="right">
            <IconButton
              onClick={() => navigate("/login")}
              sx={{
                width: isMobile ? "100%" : "auto",
                height: isMobile ? 40 : "auto",
                justifyContent: isMobile ? "flex-start" : "center",
                pl: isMobile ? 1.5 : 0,
                color: "rgba(220, 120, 120, 0.6)",
                "&:hover": { color: "rgba(255, 100, 100, 0.9)" },
              }}
            >
              <LogOutIcon size={isMobile ? 20 : 24} />
              {isMobile && (
                <Typography
                  sx={{
                    color: "rgba(255, 100, 100, 0.7)",
                    ml: 1.5,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  Sair
                </Typography>
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};
