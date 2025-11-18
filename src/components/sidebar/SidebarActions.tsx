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
      gap: isMobile ? 0.8 : 1.5,
      width: "100%",
      mt: isMobile ? 1.5 : 2,
      px: isMobile ? 0.6 : 1,
    },

    buttonBase: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      borderRadius: 2,
      px: isMobile ? 1.4 : 2,
      py: isMobile ? 0.8 : 1.2,
      justifyContent: "flex-start",
      transition: "0.25s ease",
      cursor: "pointer",

      ...(isMobile
        ? {}
        : {
            "&:hover": {
              transform: "translateX(4px)",
              background: "rgba(100,200,255,0.08)",
              boxShadow: "0 0 10px rgba(100,200,255,0.18)",
            },
          }),
    },

    label: {
      ml: 1.3,
      fontSize: isMobile ? "0.88rem" : "0.92rem",
      fontWeight: 500,
      color: "inherit",
    },

    primary: {
      color: "rgba(200, 240, 255, 0.92)",
      "&:hover": {
        color: "rgba(120, 255, 255, 1)",
      },
    },

    standard: {
      color: "rgba(220, 220, 230, 0.85)",
      "&:hover": {
        color: "rgba(130, 200, 255, 1)",
      },
    },

    danger: {
      color: "rgba(255, 120, 120, 0.82)",
      "&:hover": {
        color: "rgba(255, 100, 100, 1)",
      },
    },
  };

  const ButtonWrapper = ({ children, title }: any) => {
    if (isMobile) {
      return <Box>{children}</Box>;
    }
    return (
      <Tooltip title={title} placement="right">
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
