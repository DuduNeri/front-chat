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
          // Filtro opcional: Ignora mensagens inválidas do backend
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

    // Fecha conexão antiga
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
          return; // Ignora mensagens inválidas
        }
        setMessages((prev) => {
          // Substitui temp se matching (previne race condition duplicatas)
          const tempIndex = prev.findIndex(
            (m) => m.id.startsWith("temp-") && m.content === newMessage.content && m.senderId === currentUserId
          );
          if (tempIndex !== -1) {
            const newPrev = [...prev];
            newPrev[tempIndex] = newMessage;
            return newPrev;
          }
          // Evita adicionar se já existe
          if (prev.some((m) => m.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      } catch (err) {
        console.error("Erro ao processar mensagem do WS:", err);
      }
    };

    return () => ws.close();
  }, [activeChatId, currentUserId]);

  // 3️⃣ Auto-scroll para o bottom quando mensagens mudam ou chat carrega
  useEffect(() => {
    if (bottomAnchorRef.current) {
      console.log("Scrolling to bottom..."); // Debug: verifique se isso aparece no console ao enviar/carregar
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  // 4️⃣ Enviar mensagem
  const handleMessageSent = async (content: string) => {
    if (!activeChatId || !content.trim()) return;

    // Mensagem temporária local
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
    console.log(tempMessage);
    
    setMessages((prev) => [...prev, tempMessage]);

    try {
      // Envia para backend salvar no banco
      const savedMessage = await SendMessage(activeChatId, content);
      console.log("Saved message from backend:", savedMessage); // Debug: Verifique se id está undefined aqui

      // FIX: Valide se savedMessage é válido antes de atualizar (evita override com {})
      if (!savedMessage || !savedMessage.id || Object.keys(savedMessage).length === 0) {
        console.error("Backend retornou mensagem inválida/empty - mantendo temp:", savedMessage);
        return; // Não atualiza - mantém temp (fixe backend!)
      }

      // Safeguard: Copie campos do temp se missing no saved
      const fixedSavedMessage = {
        ...tempMessage, // Retém temp como base
        ...savedMessage, // Override com saved (id, etc.)
      };

      // Atualiza a mensagem temporária
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempMessage.id ? fixedSavedMessage : msg))
      );

      // Opcional: envia via WebSocket (comente se backend broadcast automaticamente para evitar duplicatas)
      // wsRef.current?.send(JSON.stringify({ senderId: currentUserId, content }));
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      // Remove temp em caso de erro
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
          color: "#aaa",
        }}
      >
        Selecione uma conversa para começar
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        p: { xs: 1, sm: 2 },
        gap: 2,
        height: "100%",
      }}
    >
      <Box
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          // Adicione padding-bottom para espaço extra no bottom se necessário
          pb: 2,
        }}
      >
        <MessageList messages={messages} currentUserId={currentUserId} />
        <div ref={bottomAnchorRef} /> {/* Âncora invisível para scrollIntoView */}
      </Box>
      <MessageInput
        conversationId={activeChatId}
        onMessageSent={handleMessageSent}
        isMobile={isMobile}
      />
    </Box>
  );
};