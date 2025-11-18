import { Box } from "@mui/material";
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
            animation: "fadeIn 1s ease",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY()" },
            },
          }}
        >
          <Box
            sx={{
              mt: 3,
              width: "1000px",
              height: "10px",
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
