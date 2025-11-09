import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  Plus as PlusIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isMobile: boolean;
}

export const SidebarActions = ({ isMobile }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 0.75 : 2,
          width: isMobile ? "100%" : "auto",
        }}
      >
        {/* Botão Criar Conversa */}
        <Tooltip title="Criar conversa" placement="right">
          <IconButton
            disableRipple
            disableFocusRipple
            sx={{
              color: "rgba(100, 200, 255, 0.7)",
              "&:hover": { color: "rgba(100, 200, 255, 0.9)" },
            }}
          >
            <PlusIcon size={isMobile ? 20 : 24} />
          </IconButton>
        </Tooltip>

        {/* Botão Home */}
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

        {/* Botão Configurações */}
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

        {/* Botão Sair */}
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
    </>
  );
};
