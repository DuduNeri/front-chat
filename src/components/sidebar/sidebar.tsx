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
        width: isMobile ? "100%" : 420,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 2 : 3,
        py: isMobile ? 1.5 : 3,
        px: isMobile ? 2 : 3,
        background: "linear-gradient(180deg, #1b1d29 0%, #161722 100%)",
        borderRight: isMobile ? "none" : "1px solid rgba(100, 200, 255, 0.12)",
        alignItems: "stretch",
        overflowY: "auto",
        scrollbarWidth: "none",
        transition: "all .3s ease",

        "&::-webkit-scrollbar": {
          display: "none",
        },

        // glow sutil nas bordas
        boxShadow: isMobile
          ? "none"
          : "8px 0 25px rgba(100, 200, 255, 0.08)",
      }}
    >
      {/* 🔹 Header */}
      <SidebarHeader isMobile={isMobile} setSidebarOpen={setSidebarOpen} />

      {/* 🔹 Profile */}
      <SidebarProfile isMobile={isMobile} />

      {/* 🔹 Lista de Chats (scroll flexível) */}
      <Box sx={{ flex: 1, display: "flex" }}>
        <SidebarChatList isMobile={isMobile} />
      </Box>

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
