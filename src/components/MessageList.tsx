import React, { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import { Message } from "../api/types/types";

interface Props {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { messages, currentUserId } = props;

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: { xs: 1.5, sm: 2.5 },
        width: "100%",
        background: "linear-gradient(135deg, rgba(10, 15, 30, 0.4) 0%, rgba(20, 25, 45, 0.2) 100%)",
        borderRadius: { xs: "20px", sm: "24px" },
        backdropFilter: "blur(8px)",
      }}
    >
      {messages.map((message, index) => {
        const isOwn = message.senderId === currentUserId;

        return (
          <Box
            key={message.id ?? `fallback-${index}`}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: isOwn ? "flex-end" : "flex-start",
              animation: "fadeInUp 0.3s ease-out forwards",
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              transform: "translateY(8px)",
              
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(8px) scale(0.95)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0) scale(1)",
                },
              },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "85%", sm: "70%" },
                minWidth: "60px",
                background: isOwn
                  ? "linear-gradient(135deg, rgba(0, 150, 255, 0.15) 0%, rgba(0, 200, 255, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(40, 45, 70, 0.15) 0%, rgba(30, 35, 60, 0.1) 100%)",
                backdropFilter: "blur(12px)",
                color: "#f0f2f5",
                borderRadius: "20px",
                px: 2.5,
                py: 1.5,
                boxShadow: isOwn
                  ? "0 4px 20px rgba(0, 150, 255, 0.2), 0 2px 8px rgba(0, 200, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                border: isOwn
                  ? "1px solid rgba(0, 180, 255, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                borderBottomRightRadius: isOwn ? "6px" : "20px",
                borderBottomLeftRadius: isOwn ? "20px" : "6px",
                transition: "all 0.2s ease-in-out",
                position: "relative",
                overflow: "hidden",
                
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: isOwn
                    ? "0 6px 24px rgba(0, 150, 255, 0.25), 0 3px 12px rgba(0, 200, 255, 0.2)"
                    : "0 6px 24px rgba(0, 0, 0, 0.2), 0 3px 12px rgba(0, 0, 0, 0.15)",
                },
                
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: isOwn
                    ? "linear-gradient(90deg, transparent 0%, rgba(0, 200, 255, 0.4) 50%, transparent 100%)"
                    : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-word",
                  fontSize: { xs: "0.925rem", sm: "1rem" },
                  lineHeight: 1.5,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                }}
              >
                {message.content}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
});

MessageList.displayName = "MessageList";