import { Box } from "@mui/material";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarChatList } from "./SidebarChatList";
import { SidebarActions } from "./SidebarActions";
import { useState } from "react";

interface Props {
  isMobile: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const Sidebar = ({ isMobile, setSidebarOpen }: Props) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

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
        "&::-webkit-scrollbar": { display: "none" },
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
        <SidebarChatList
          isMobile={isMobile}
          onSelectChat={(id) => {
            console.log("Selecionou chat:", id);
            setActiveChatId(id);
          }}
        />
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
