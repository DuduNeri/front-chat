import { api } from "../conect";
import { CreateConversationProps } from "../types/types";

export async function createConversation({
  title,
  ownerId,
  participantId,
}: CreateConversationProps & { ownerId: string }) {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("Usuário não autenticado");

  const response = await api.post(
    "/api/conversation/sala",
    {
      title,
      ownerId,        
      participantId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}
