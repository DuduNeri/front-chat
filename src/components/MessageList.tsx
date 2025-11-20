import { Box, Typography } from "@mui/material";
import { MessageBubble } from "./MessageBubble";
import { Message } from "../api/types/types";

interface Props {
  messages: Message[];
  currentUserId: string; // id do usuário logado
}

export const MessageList = ({ messages, currentUserId }: Props) => {
  // opcional: ordenar mensagens por data
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "10px", sm: "12px", md: "16px" },
        pr: { xs: 0, sm: 0.5, md: 2 },
        background:
          "linear-gradient(to bottom, rgba(15,15,20,0.4), rgba(10,10,15,0.3))",
        backdropFilter: "blur(4px)",
        borderRadius: "12px",
        boxShadow: "inset 0 0 20px rgba(0, 150, 255, 0.05)",
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            sx={{
              mt: 3,
              fontSize: "30px",
              fontWeight: 500,
              color: "#0ea5e9aa",
              textShadow: "0 0 10px rgba(56, 189, 248, 0.3)",
            }}
          >
            Bem-vindo de volta!
          </Typography>
        </Box>
      ) : (
        sortedMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            currentUserId={currentUserId} // ✅ agora está passando
          />
        ))
      )}
    </Box>
  );
};
