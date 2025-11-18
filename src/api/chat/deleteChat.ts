import { api } from "../conect";

export async function deleteChat(conversationId: string) {
  try {
    const response = await api.delete(`/api/conversation/${conversationId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao deletar conversa:", error);
    throw new Error(
      error.response?.data?.message || "Erro ao deletar conversa"
    );
  }
}
