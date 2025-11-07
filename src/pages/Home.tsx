import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { Sidebar } from "../components/sidebar/Sidebar";
import { MessageList } from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";
import { Message } from "../components/chat/types";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(135deg, #0a0a15, #1a1a2e, #16213e)",
      }}
    >
      {/* ✅ Sidebar renderizando */}
      <Sidebar isMobile={isMobile} />

      {/* ✅ Área principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        {/* ✅ MessageList renderizando */}
        <MessageList messages={messages} />

        {/* ✅ MessageInput renderizando */}
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isMobile={isMobile}
        />
      </Box>
    </Box>
  );
}
