import React, { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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
        flex: 1,
        overflowY: "auto",
        p: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        // scroll suave
        scrollbarWidth: "thin",
        scrollbarColor: "#333 #0b141a",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#0b141a",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#333",
          borderRadius: "4px",
        },
      }}
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => {
          const isOwn = message.senderId === currentUserId;
          const isTemp = message.id?.startsWith("temp-");

          return (
            <motion.div
              key={message.id ?? `fallback-${index}`}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: isTemp ? 0 : index * 0.03, // stagger natural
              }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isOwn ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    minWidth: "100px",
                    bgcolor: isOwn ? "#2f465aff" : "#1e2a38", // verde escuro próprio / cinza azulado outro
                    color: "#e4e6eb",
                    borderRadius: "18px",
                    px: 2,
                    py: 1.5,
                    position: "relative",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    borderBottomRightRadius: isOwn ? "4px" : "18px",
                    borderBottomLeftRadius: isOwn ? "18px" : "4px",
                    opacity: isTemp ? 0.6 : 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 4px 16px rgba(0,0,0,0.6)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: "break-word",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      lineHeight: 1.4,
                      fontStyle: isTemp ? "italic" : "normal",
                    }}
                  >
                    {message.content}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "right",
                      mt: 0.5,
                      color: isOwn ? "#94e8c8" : "#a0aec0",
                      opacity: 0.8,
                      fontSize: "0.69rem",
                    }}
                  >
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "•••"}
                    {isTemp && (
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ marginLeft: "4px" }}
                      >
                        digitando...
                      </motion.span>
                    )}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Box>
  );
});

MessageList.displayName = "MessageList";