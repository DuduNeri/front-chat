import { Box, IconButton, Typography } from "@mui/material";
import { getChatsByUser } from "../../api/chat/listChats";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DeleteChat } from "../layouts/DeleteModal";

interface Props {
  isMobile: boolean;
  onSelectChat: (id: string) => void; 
}

export const SidebarChatList = ({ isMobile, onSelectChat }: Props) => {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string>("");

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
        gap: isMobile ? 1.8 : 2.5,
        width: "100%",
        p: isMobile ? 1 : 1.5,
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.04)",
      }}
    >
      {/* Título da seção */}
      <Typography
        sx={{
          color: "rgba(200, 220, 255, 0.8)",
          fontSize: isMobile ? "0.9rem" : "1rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          px: 1,
          mb: 0.5,
        }}
      >
        Conversas
      </Typography>

      {/* ❌ Mensagem de erro */}
      {error && (
        <Typography
          sx={{
            color: "#ff6b6b",
            fontSize: isMobile ? "0.8rem" : "0.85rem",
            background: "linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.05) 100%)",
            border: "1px solid rgba(255, 0, 0, 0.15)",
            p: isMobile ? 1 : 1.2,
            borderRadius: "12px",
            textAlign: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          {error}
        </Typography>
      )}

      {/* 📜 Lista de chats */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 1 : 1.5,
          flex: 1,
        }}
      >
        {loading
          ? [...Array(4)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  height: isMobile ? 48 : 56,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  animation: "pulse 2s ease-in-out infinite",
                  position: "relative",
                  overflow: "hidden",
                  
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    animation: "shimmer 2s infinite",
                  },
                  
                  "@keyframes pulse": {
                    "0%, 100%": { opacity: 0.6 },
                    "50%": { opacity: 0.8 },
                  },
                  
                  "@keyframes shimmer": {
                    "0%": { left: "-100%" },
                    "100%": { left: "100%" },
                  },
                }}
              />
            ))
          : chats.map((chat) => (
              <Box
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                sx={{
                  p: isMobile ? 1.2 : 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.3), transparent)",
                  },

                  ...(isMobile
                    ? {
                        "&:active": {
                          transform: "scale(0.98)",
                          background: "linear-gradient(135deg, rgba(100, 200, 255, 0.1) 0%, rgba(100, 200, 255, 0.05) 100%)",
                        },
                      }
                    : {
                        "&:hover": {
                          background: "linear-gradient(135deg, rgba(100, 200, 255, 0.12) 0%, rgba(100, 200, 255, 0.06) 100%)",
                          borderColor: "rgba(100, 200, 255, 0.3)",
                          transform: "translateX(6px) translateY(-1px)",
                          boxShadow: "0 6px 20px rgba(100, 200, 255, 0.15), 0 3px 12px rgba(100, 200, 255, 0.1)",
                        },
                      }),
                }}
              >
                {/* Indicador neon refinado */}
                <Box
                  sx={{
                    width: isMobile ? 8 : 10,
                    height: isMobile ? 8 : 10,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #64c8ff 0%, #88a2ff 100%)",
                    boxShadow: "0 0 12px rgba(100, 200, 255, 0.6)",
                    flexShrink: 0,
                    animation: "pulseGlow 2s ease-in-out infinite",
                    
                    "@keyframes pulseGlow": {
                      "0%, 100%": { 
                        boxShadow: "0 0 8px rgba(100, 200, 255, 0.4), 0 0 12px rgba(100, 200, 255, 0.2)" 
                      },
                      "50%": { 
                        boxShadow: "0 0 12px rgba(100, 200, 255, 0.8), 0 0 20px rgba(100, 200, 255, 0.4)" 
                      },
                    },
                  }}
                />

                {/* Título */}
                <Typography
                  sx={{
                    flex: 1,
                    color: "rgba(230, 240, 255, 0.95)",
                    fontSize: isMobile ? "0.88rem" : "0.95rem",
                    fontWeight: 500,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    letterSpacing: "0.01em",
                    transition: "all 0.3s ease",
                  }}
                >
                  {chat.title || chat.name || "Chat sem título"}
                </Typography>

                {/* Botão deletar */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChatId(chat.id);
                    setOpenDelete(true);
                  }}
                  sx={{
                    ml: "auto",
                    p: isMobile ? "6px" : "8px",
                    borderRadius: "10px",
                    color: "rgba(255, 100, 100, 0.7)",
                    background: "rgba(255, 100, 100, 0.05)",
                    border: "1px solid rgba(255, 100, 100, 0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    flexShrink: 0,
                    
                    ...(isMobile
                      ? {
                          "&:active": {
                            transform: "scale(0.85)",
                            color: "rgb(255, 120, 120)",
                            background: "rgba(255, 100, 100, 0.15)",
                          },
                        }
                      : {
                          "&:hover": {
                            color: "rgb(255, 140, 140)",
                            background: "rgba(255, 100, 100, 0.15)",
                            borderColor: "rgba(255, 100, 100, 0.3)",
                            boxShadow: "0 4px 15px rgba(255, 100, 100, 0.25)",
                            transform: "translateY(-2px) scale(1.05)",
                          },
                        }),
                  }}
                >
                  <DeleteForeverIcon sx={{ 
                    fontSize: isMobile ? 20 : 22,
                    transition: "transform 0.2s ease",
                  }} />
                </IconButton>
              </Box>
            ))}
      </Box>

      {/* 🗑 MODAL DELETAR */}
      <DeleteChat
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDeleted={fetchChats}
        conversationId={selectedChatId}
      />
    </Box>
  );
};