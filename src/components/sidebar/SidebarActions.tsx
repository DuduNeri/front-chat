import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import {
  Plus as PlusIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateRoomModal } from "../layouts/ModalChat";
import { useState } from "react";
import { createConversation } from "../../api/chat/createChats";

interface Props {
  isMobile: boolean;
}

export const SidebarActions = ({ isMobile }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleCreateRoom = async ({
    title,
    participants,
  }: {
    title: string;
    participants: string[];
  }) => {
    const ownerId = localStorage.getItem("userId");

    if (!ownerId) {
      alert("Usuário não identificado. Faça login novamente.");
      return;
    }

    try {
      await createConversation({
        title,
        ownerId,
        participantId: participants[0],
      });
      setOpen(false);
    } catch (err) {
      console.error("Erro ao criar sala:", err);
      alert("Erro ao criar sala");
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      gap: isMobile ? 1 : 1.8,
      width: "100%",
      mt: isMobile ? 2 : 2.5,
      px: isMobile ? 0.8 : 1.2,
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(12px)",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      py: 2,
    },

    buttonBase: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: "14px",
      px: isMobile ? 1.6 : 2.2,
      py: isMobile ? 1 : 1.4,
      justifyContent: "flex-start",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      background: "transparent",
      position: "relative",
      overflow: "hidden",

      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "3px",
        background: "currentColor",
        opacity: 0,
        transform: "scaleY(0)",
        transition: "all 0.3s ease",
        borderRadius: "0 2px 2px 0",
      },

      ...(isMobile
        ? {
            "&:active": {
              transform: "scale(0.98)",
              background: "rgba(255, 255, 255, 0.05)",
            },
          }
        : {
            "&:hover": {
              transform: "translateX(6px)",
              background: "rgba(100, 200, 255, 0.08)",
              boxShadow: "0 4px 20px rgba(100, 200, 255, 0.15), 0 2px 8px rgba(100, 200, 255, 0.1)",
              
              "&::before": {
                opacity: 0.6,
                transform: "scaleY(1)",
              },
            },
          }),
    },

    label: {
      ml: 1.8,
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      fontWeight: 500,
      color: "inherit",
      letterSpacing: "0.01em",
      transition: "all 0.3s ease",
    },

    primary: {
      color: "rgba(180, 230, 255, 0.95)",
      background: "linear-gradient(135deg, rgba(0, 150, 255, 0.1) 0%, rgba(0, 200, 255, 0.05) 100%)",
      
      ...(isMobile ? {} : {
        "&:hover": {
          color: "#88D4FF",
          background: "linear-gradient(135deg, rgba(0, 150, 255, 0.15) 0%, rgba(0, 200, 255, 0.1) 100%)",
        },
      }),
    },

    standard: {
      color: "rgba(220, 230, 245, 0.9)",
      
      ...(isMobile ? {} : {
        "&:hover": {
          color: "rgba(160, 220, 255, 1)",
        },
      }),
    },

    danger: {
      color: "rgba(255, 140, 140, 0.9)",
      
      ...(isMobile ? {} : {
        "&:hover": {
          color: "rgba(255, 120, 120, 1)",
        },
      }),
    },
  };

  const ButtonWrapper = ({ children, title }: any) => {
    if (isMobile) {
      return <Box>{children}</Box>;
    }
    return (
      <Tooltip title={title} placement="right" arrow>
        <Box>{children}</Box>
      </Tooltip>
    );
  };

  return (
    <>
      <Box sx={styles.container}>
        {/* Criar sala */}
        <ButtonWrapper title="Criar sala">
          <IconButton
            disableRipple
            sx={{ ...styles.buttonBase, ...styles.primary }}
            onClick={() => setOpen(true)}
          >
            <PlusIcon size={isMobile ? 20 : 22} />
            <Typography sx={styles.label}>Criar sala</Typography>
          </IconButton>
        </ButtonWrapper>

        {/* Home */}
        <ButtonWrapper title="Página inicial">
          <IconButton disableRipple sx={{ ...styles.buttonBase, ...styles.standard }}>
            <HomeIcon size={isMobile ? 20 : 22} />
            <Typography sx={styles.label}>Página inicial</Typography>
          </IconButton>
        </ButtonWrapper>

        {/* Configurações */}
        <ButtonWrapper title="Configurações">
          <IconButton disableRipple sx={{ ...styles.buttonBase, ...styles.standard }}>
            <SettingsIcon size={isMobile ? 20 : 22} />
            <Typography sx={styles.label}>Configurações</Typography>
          </IconButton>
        </ButtonWrapper>

        {/* Logout */}
        <ButtonWrapper title="Sair">
          <IconButton
            disableRipple
            sx={{ ...styles.buttonBase, ...styles.danger }}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              navigate("/login");
            }}
          >
            <LogOutIcon size={isMobile ? 20 : 22} />
            <Typography sx={styles.label}>Sair</Typography>
          </IconButton>
        </ButtonWrapper>
      </Box>

      <CreateRoomModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateRoom}
      />
    </>
  );
};