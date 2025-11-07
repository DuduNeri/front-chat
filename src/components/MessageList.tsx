import { Box, Typography } from "@mui/material";
import { MessageBubble } from "./MessageBubble";
import { Messagelist } from "./types";

export const MessageList = ({ messages }: { messages: Messagelist[] }) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "10px", sm: "12px", md: "16px" },
        pr: { xs: 0, sm: 0.5, md: 2 },
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(100, 200, 255, 0.25)",
          borderRadius: "10px",
          "&:hover": {
            background: "rgba(100, 200, 255, 0.4)",
          },
        },
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.35)",
              fontSize: {
                xs: "0.95rem",
                sm: "1.05rem",
                md: "1.25rem",
              },
              fontWeight: 500,
              letterSpacing: 0.3,
            }}
          >
            Comece uma conversa...
          </Typography>
        </Box>
      ) : (
        messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))
      )}
    </Box>
  );
};
