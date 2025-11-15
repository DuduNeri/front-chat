import { api } from "../conect";

export async function getChatsByUser(userId: string) {
  try {
    const response = await api.get(`/api/conversation/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar conversas:", error);
    return [];
  }
}
