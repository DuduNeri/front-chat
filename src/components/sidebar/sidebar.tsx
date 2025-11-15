import { Box } from "@mui/material";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarChatList } from "./SidebarChatList";
import { SidebarActions } from "./SidebarActions";

interface Props {
  isMobile: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const Sidebar = ({ isMobile, setSidebarOpen }: Props) => {
  return (
   <Box
  sx={{
    width: isMobile ? "100%" : 200, // ← 🔥 AQUI aumentei a largura
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? 2 : 3,
    py: isMobile ? 2 : 3,
    px: isMobile ? 2 : 2,
    borderRight: isMobile ? "none" : "1px solid rgba(100,200,255,0.18)",
    alignItems: isMobile ? "flex-start" : "center",
    overflowY: "auto",
    scrollbarWidth: "none",

    "&::-webkit-scrollbar": {
      width: 0,
    },
  }}
>

      {/* 🔹 Header */}
      <SidebarHeader isMobile={isMobile} setSidebarOpen={setSidebarOpen} />

      {/* 🔹 Profile */}
      <SidebarProfile isMobile={isMobile} />

      {/* 🔹 Lista de Chats */}
      <SidebarChatList isMobile={isMobile} />

      {/* 🔹 Ações */}
      <SidebarActions isMobile={isMobile} />

      {/* 🔹 Linha de brilho inferior */}
      <Box
        sx={{
          width: "100%",
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(100,200,255,0.4), transparent)",
          borderRadius: 10,
          mt: 1,
        }}
      />
    </Box>
  );
};
