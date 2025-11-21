import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar } from "../components/sidebar/Sidebar";
import { ChatWindow } from "../components/chat/ChatWindow";
import { useState } from "react";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const currentUserId = localStorage.getItem("userId") || "";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(135deg, #0a0a15, #1a1a2e, #16213e)",
      }}
    >
      {/* Sidebar envia o chat selecionado */}
      <Sidebar isMobile={isMobile} onSelectChat={setActiveChatId} />

      {/* Área principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        {/* ChatWindow renderiza a lista de mensagens e o input */}
        <ChatWindow
          activeChatId={activeChatId}
          currentUserId={currentUserId}
          isMobile={isMobile}
        />
      </Box>
    </Box>
  );
}
