import { Box, IconButton, Typography } from "@mui/material";
import { getChatsByUser } from "../../api/chat/listChats";
import { useEffect, useState } from "react";
import { getConversation } from "../../api/chat/listChat";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DeleteChat } from "../layouts/DeleteModal";

interface Props {
  isMobile: boolean;
}

export const SidebarChatList = ({ isMobile }: Props) => {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchChats = async () => {
    if (!token || !userId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getChatsByUser(userId);
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
        gap: isMobile ? 1.5 : 2,
        width: "100%",
        p: isMobile ? 0.6 : 1.2,
        borderRadius: 2,
        backdropFilter: "blur(6px)",
      }}
    >
      {/* ❌ Erro */}
      {error && (
        <Typography
          sx={{
            color: "#ff8585",
            fontSize: isMobile ? "0.75rem" : "0.85rem",
            background: "rgba(255,0,0,0.05)",
            border: "1px solid rgba(255,0,0,0.15)",
            p: isMobile ? 0.8 : 1,
            borderRadius: 2,
          }}
        >
          {error}
        </Typography>
      )}

      {/* 📜 Lista */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? 0.8 : 1.2 }}>
        {loading
          ? [...Array(4)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  height: isMobile ? 32 : 38,
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
                key={chat.id}
                sx={{
                  p: isMobile ? 1 : 1.2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  transition: "0.25s ease",
                  ...(isMobile
                    ? {}
                    : {
                        "&:hover": {
                          background: "rgba(100,200,255,0.12)",
                          borderColor: "rgba(100,200,255,0.25)",
                          transform: "translateX(4px)",
                          boxShadow: "0 0 12px rgba(100,200,255,0.2)",
                        },
                      }),
                }}
                onClick={async () => {
                  const data = await getConversation(chat.id);
                  setSelectedConversation(data);
                }}
              >
                {/* Bolinha neon */}
                <Box
                  sx={{
                    width: isMobile ? 6 : 8,
                    height: isMobile ? 6 : 8,
                    borderRadius: "50%",
                    background: "#64c8ff",
                    boxShadow: "0 0 6px rgba(100,200,255,0.6)",
                  }}
                />

                {/* Título */}
                <Typography
                  sx={{
                    flex: 1,
                    color: "#e9f7ff",
                    fontSize: isMobile ? "0.85rem" : "0.92rem",
                    fontWeight: 500,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {chat.title || chat.name || "Chat"}
                </Typography>

                {/* Botão de deletar */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedConversation(chat);
                    setOpenDelete(true);
                  }}
                  sx={{
                    ml: "auto",
                    mr: isMobile ? 0.4 : 1,
                    p: isMobile ? "4px" : "6px",
                    borderRadius: "10px",
                    color: "rgba(255, 80, 80, 0.85)",
                    transition: "0.25s ease",
                    ...(isMobile
                      ? { "&:active": { transform: "scale(0.9)", color: "rgb(255,120,120)" } }
                      : {
                          "&:hover": {
                            color: "rgb(255,120,120)",
                            background: "rgba(255,80,80,0.15)",
                            boxShadow: "0 0 10px rgba(255,80,80,0.4)",
                            transform: "translateY(-2px) scale(1.08)",
                          },
                        }),
                  }}
                >
                  <DeleteForeverIcon sx={{ fontSize: isMobile ? 22 : 26 }} />
                </IconButton>
              </Box>
            ))}

        {/* MODAL DELETAR — agora corretamente tipado */}
        {selectedConversation && (
          <DeleteChat
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            conversationId={selectedConversation.id}
            onDeleted={fetchChats}
          />
        )}
      </Box>
    </Box>
  );
};
