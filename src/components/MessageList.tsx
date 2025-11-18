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
        background:
          "linear-gradient(to bottom, rgba(15,15,20,0.4), rgba(10,10,15,0.3))",
        backdropFilter: "blur(4px)",
        borderRadius: "12px",
        boxShadow: "inset 0 0 20px rgba(0, 150, 255, 0.05)",

        /* SCROLLBAR */
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(255, 255, 255, 0.02)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "linear-gradient(180deg, #0ea5e9aa, #38bdf888)",
          borderRadius: "10px",
          transition: "0.3s",
          "&:hover": {
            background: "linear-gradient(180deg, #0ea5e9, #38bdf8)",
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
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {/* Linha neon animada */}
              <Typography
            sx={{
              mt: 3,
              fontSize: "30px",
              fontWeight: "500",
              letterSpacing: "0.5px",
              color: "#0ea5e9aa",
              textShadow: "0 0 10px rgba(56, 189, 248, 0.3)",
              animation: "fadeText 1.8s ease",
              "@keyframes fadeText": {
                from: { opacity: 0, transform: "translateY(5px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            Bem-vindo de volta!
          </Typography>
          <Box
            sx={{
              mt: 3,
              width: "200px",
              height: "4px",
              borderRadius: "4px",
              background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
              boxShadow: "0 0 12px #0ea5e9aa",
              animation: "pulse 2.2s infinite ease-in-out",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 0.4, transform: "scaleX(0.9)" },
                "50%": { opacity: 1, transform: "scaleX(1)" },
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
