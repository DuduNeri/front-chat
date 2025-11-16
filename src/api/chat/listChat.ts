import { api } from "../conect";

export async function getConversation(conversatioId: string) {
  try {
    const response = await api.get(`/api/conversation/${conversatioId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao listar conversas:", error);
    return [];
  }
}
