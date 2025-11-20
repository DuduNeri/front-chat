import { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar } from "../components/sidebar/Sidebar";
import { MessageList } from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";
import { Message } from "../api/types/types";
import { getConversation } from "../api/chat/listChat";
import { getMessages } from "../api/chat/listMessages";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeChatId, setActiveChatId] = useState<string>("");

  // Id do usuário logado (pode vir de login/localStorage depois)
  const currentUserId = "me";

  // 🔥 Carrega mensagens assim que clicar em uma conversa
  useEffect(() => {
    if (!activeChatId) return;

    async function loadMessages() {
      const data = await getMessages(activeChatId);

      // GARANTE que é um array, sempre
      setMessages(Array.isArray(data) ? data : []);
    }

    loadMessages();
  }, [activeChatId]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      conversationId: activeChatId,
      senderId: currentUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sender: {
        id: currentUserId,
        name: "Você",
        email: "voce@example.com",
      },
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
      {/* Sidebar envia o chat selecionado */}
      <Sidebar isMobile={isMobile} onSelectChat={setActiveChatId} />

      {/* Área principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        {/* ✅ Passa currentUserId para MessageList */}
        <MessageList messages={messages} currentUserId={currentUserId} />

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
