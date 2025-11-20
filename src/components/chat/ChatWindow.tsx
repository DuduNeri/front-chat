import { useEffect, useState } from "react";
import { MessageList } from "../MessageList";
import { api } from "../../api/conect";

export const ChatWindow = ({ activeChatId }: { activeChatId: string | null }) => {
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    if (!activeChatId) return;
    try {
      const res = await api.get(`/messages/${activeChatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(res.data); // <<--- ISSO AQUI IMPORTA
    } catch (err) {
      console.log("Erro ao buscar mensagens:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [activeChatId]); // <<--- QUANDO TROCA A SALA, BUSCA DE NOVO

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MessageList messages={messages} />
    </div>
  );
};
