import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import {
  Plus as PlusIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateRoomModal } from "../layouts/ModalChat";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    handleCreateRoom;
  }, [createConversation]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      gap: isMobile ? 1 : 2,
      width: isMobile ? "100%" : "auto",
      mt: 2,
    },
    button: {
      transition: "all 0.2s ease-in-out",
      justifyContent: "flex-start",
      minHeight: 48,
      borderRadius: 2,
      px: 2,
      "&:hover": {
        transform: "translateX(4px)",
        background: `rgba(100, 200, 255, 0.08)`,
      },
    },
    primaryButton: {
      color: "rgba(100, 200, 255, 0.95)",
      "&:hover": {
      
      },
    },
    standardButton: {
      color: "rgba(220, 220, 230, 0.8)",
      "&:hover": {
        color: "rgba(100, 200, 255, 1)",
      },
    },
    dangerButton: {
      color: "rgba(255, 120, 120, 0.8)",
      "&:hover": {
        color: "rgba(255, 100, 100, 1)",
      },
    },
    label: {
      ml: 1.5,
      fontSize: "0.9rem",
      fontWeight: 500,
      color: "inherit",
    },
  };

  return (
    <>
      <Box sx={styles.container}>
        {/* Criar Conversa */}
        <Tooltip title="Criar conversa" placement="right">
          <IconButton
            disableRipple
            onClick={() => setOpen(true)}
            sx={{ ...styles.button, ...styles.primaryButton }}
          >
            <PlusIcon size={22} />
            <Typography sx={styles.label}>Criar sala</Typography>
          </IconButton>
        </Tooltip>

        {/* Home */}
        <Tooltip title="Página Inicial" placement="right">
          <IconButton sx={{ ...styles.button, ...styles.standardButton }}>
            <HomeIcon size={22} />
            <Typography sx={styles.label}>Página inicial</Typography>
          </IconButton>
        </Tooltip>

        {/* Configurações */}
        <Tooltip title="Configurações" placement="right">
          <IconButton sx={{ ...styles.button, ...styles.standardButton }}>
            <SettingsIcon size={22} />
            <Typography sx={styles.label}>Configurações</Typography>
          </IconButton>
        </Tooltip>

        {/* Logout */}
        <Tooltip title="Sair" placement="right">
          <IconButton
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              navigate("/login");
            }}
            sx={{ ...styles.button, ...styles.dangerButton }}
          >
            <LogOutIcon size={22} />
            <Typography sx={styles.label}>Sair</Typography>
          </IconButton>
        </Tooltip>
      </Box>

      <CreateRoomModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateRoom}
      />
    </>
  );
};
