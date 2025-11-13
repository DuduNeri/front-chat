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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            px: 2,
            animation: "fadeIn 1.2s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.5px",
              background: "linear-gradient(90deg, #7dd3fc, #38bdf8, #0ea5e9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              textShadow: "0 0 10px rgba(56, 189, 248, 0.25)",
            }}
          >
            Bem-vindo de volta!
          </Typography>

          <Box
            sx={{
              mt: 3,
              width: "60px",
              height: "4px",
              borderRadius: "8px",
              background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
              boxShadow: "0 0 10px #0ea5e9aa",
              animation: "pulse 2.4s infinite ease-in-out",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 0.4 },
                "50%": { opacity: 1 },
              },
            }}
          />
        </Box>
      ) : (
        messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
      )}
    </Box>
  );
};
