import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { getChatsByUser } from "../../api/chat/listChats";
import { useEffect, useState } from "react";

interface Props {
  isMobile: boolean;
}

export const SidebarChatList = ({ isMobile }: Props) => {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchChats = async () => {
    if (!token || !userId) {
      setError("Sessão expirada. Faça login novamente.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getChatsByUser(userId);
      console.log("Array de conversas",data);
      setChats(data);
    } catch (e) {
      console.error("Erro ao carregar conversas:", e);
      setError("Não foi possível carregar as conversas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        p: 1,
        borderRadius: 2,
     
        backdropFilter: "blur(6px)",
      }}
    >
      {/* ❌ Mensagem de erro */}
      {error && (
        <Typography
          sx={{
            color: "#ff8585",
            fontSize: "0.85rem",
            background: "rgba(255,0,0,0.05)",
            border: "1px solid rgba(255,0,0,0.15)",
            p: 1,
            borderRadius: 2,
          }}
        >
          {error}
        </Typography>
      )}

      {/* 📜 Lista de conversas */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        {loading
          ? [...Array(4)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  height: 36,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  animation: "pulse 1.5s infinite",

                  "@keyframes pulse": {
                    "0%": { opacity: 0.4 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0.4 },
                  },
                }}
              />
            ))
          : chats.map((chat) => (
              <Box
                key={chat.id || chat._id}
                sx={{
                  p: 1.2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  borderRadius: 2,

                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",

                  transition: "0.25s ease",
                  cursor: "pointer",

                  "&:hover": {
                    background: "rgba(100,200,255,0.12)",
                    borderColor: "rgba(100,200,255,0.25)",
                    transform: "translateX(4px)",
                    boxShadow: "0 0 12px rgba(100,200,255,0.2)",
                  },
                }}
              >
                {/* Indicador neon */}
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#64c8ff",
                    boxShadow: "0 0 6px rgba(100,200,255,0.6)",
                  }}
                />

                <Typography
                  sx={{
                    color: "#e9f7ff",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    letterSpacing: "0.3px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {chat.title || chat.name || "Chat"}
                </Typography>
              </Box>
            ))}
      </Box>
    </Box>
  );
};
