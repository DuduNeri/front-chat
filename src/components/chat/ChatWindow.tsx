import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { MessageList } from "../MessageList";
import { MessageInput } from "../MessageInput";
import { Message } from "../../api/types/types";
import { getMessages } from "../../api/chat/listMessages";
import { SendMessage } from "../../api/chat/sendMessage";

interface ChatWindowProps {
  activeChatId: string | null;
  currentUserId: string;
  isMobile: boolean;
}

export const ChatWindow = ({ activeChatId, currentUserId, isMobile }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  // 1️⃣ Buscar mensagens existentes
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        const data = await getMessages(activeChatId);
        if (Array.isArray(data)) {
          setMessages(data.filter((msg) => msg.id && msg.content));
        }
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      }
    };

    loadMessages();
  }, [activeChatId]);

  // 2️⃣ Conectar WebSocket
  useEffect(() => {
    if (!activeChatId) return;

    wsRef.current?.close();

    const ws = new WebSocket(`ws://localhost:4000?chatId=${activeChatId}`);
    wsRef.current = ws;

    ws.onopen = () => console.log(`✅ Conectado ao chat ${activeChatId}`);
    ws.onclose = () => console.log(`❌ Desconectado do chat ${activeChatId}`);
    ws.onerror = (err) => console.error("WebSocket erro:", err);

    ws.onmessage = (event) => {
      try {
        const newMessage: Message = JSON.parse(event.data);
        if (!newMessage.id) {
          console.warn("Mensagem do WS sem id:", newMessage);
          return;
        }
        setMessages((prev) => {
          const tempIndex = prev.findIndex(
            (m) => m.id.startsWith("temp-") && m.content === newMessage.content && m.senderId === currentUserId
          );
          if (tempIndex !== -1) {
            const newPrev = [...prev];
            newPrev[tempIndex] = newMessage;
            return newPrev;
          }
          if (prev.some((m) => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      } catch (err) {
        console.error("Erro ao processar mensagem do WS:", err);
      }
    };

    return () => ws.close();
  }, [activeChatId, currentUserId]);

  // 3️⃣ Auto-scroll para o bottom quando mensagens mudam
  useEffect(() => {
    if (bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest"
      });
    }
  }, [messages]);

  // 4️⃣ Enviar mensagem
  const handleMessageSent = async (content: string) => {
    if (!activeChatId || !content.trim()) return;

    const tempMessage: Message = {      
      id: `temp-${Date.now()}`,
      content,
      conversationId: activeChatId,
      senderId: currentUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sender: {
        id: currentUserId,
        name: "Você",
        email: "temp@example.com",
      },
    };
    
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const savedMessage = await SendMessage(activeChatId, content);

      if (!savedMessage || !savedMessage.id || Object.keys(savedMessage).length === 0) {
        console.error("Backend retornou mensagem inválida/empty - mantendo temp:", savedMessage);
        return;
      }

      const fixedSavedMessage = {
        ...tempMessage,
        ...savedMessage,
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempMessage.id ? fixedSavedMessage : msg))
      );
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
    }
  };

  if (!activeChatId) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, rgba(10, 15, 30, 0.6) 0%, rgba(20, 25, 45, 0.4) 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
          fontWeight: 300,
          letterSpacing: "0.02em",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          💬 Selecione uma conversa para começar
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        p: { xs: 1.5, sm: 2.5 },
        gap: 2.5,
        height: "100%",
        background: "linear-gradient(135deg, rgba(12, 18, 35, 0.5) 0%, rgba(18, 24, 45, 0.3) 100%)",
        backdropFilter: "blur(10px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <Box
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          pb: 2,
          // Custom scrollbar
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 180, 255, 0.2)",
            borderRadius: "10px",
            "&:hover": {
              background: "rgba(0, 200, 255, 0.3)",
            },
          },
        }}
      >
        <MessageList messages={messages} currentUserId={currentUserId} ref={scrollContainerRef} />
        <div ref={bottomAnchorRef} />
      </Box>
      
      <MessageInput
        conversationId={activeChatId}
        onMessageSent={handleMessageSent}
        isMobile={isMobile}
      />
    </Box>
  );
};