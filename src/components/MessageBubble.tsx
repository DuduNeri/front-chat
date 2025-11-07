import { Box, Paper, Typography } from "@mui/material";
import { Check as CheckIcon } from "lucide-react";
import { Messagelist } from "./types";

export const MessageBubble = ({ message }: { message: Messagelist }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          message.sender === "user" ? "flex-end" : "flex-start",
        animation: "slideIn 0.3s ease-out",
        px: { xs: 0.5, md: 0 },
      }}
    >
      <Paper
        sx={{
          maxWidth: { xs: "88%", sm: "75%", md: "60%" },
          p: { xs: "10px 13px", sm: "11px 15px", md: "13px 18px" },
          background:
            message.sender === "user"
              ? "linear-gradient(135deg, rgba(100, 150, 200, 0.25) 0%, rgba(80, 120, 200, 0.15) 100%)"
              : "linear-gradient(135deg, rgba(60, 120, 180, 0.2) 0%, rgba(50, 100, 160, 0.12) 100%)",
          border: "1px solid rgba(100, 200, 255, 0.25)",
          borderRadius:
            message.sender === "user"
              ? "16px 16px 3px 16px"
              : "16px 16px 16px 3px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
          position: "relative",
          backdropFilter: "blur(12px)",
          transition: "all 0.2s ease",
          "&:hover": {
            boxShadow:
              "0 8px 24px rgba(100, 200, 255, 0.15)",
          },
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: {
              xs: "0.85rem",
              sm: "0.9rem",
              md: "0.95rem",
            },
            lineHeight: 1.5,
            wordWrap: "break-word",
            fontWeight: 400,
          }}
        >
          {message.text}
        </Typography>

        {message.sender === "user" && (
          <Box
            sx={{
              position: "absolute",
              bottom: 5,
              right: 8,
              display: "flex",
              gap: 0.5,
            }}
          >
            <CheckIcon
              size={11}
              color="rgba(100, 200, 255, 0.5)"
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};
