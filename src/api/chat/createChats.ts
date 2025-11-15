import { api } from "../conect";

export async function createConversation({
  title,
  ownerId,
  participantId,
}: {
  title: string;
  ownerId: string;
  participantId: string; // <- você mandava isso
}) {
  try {
    const response = await api.post("/api/conversation/sala", {
      data: {
        ownerId,
        title,
      },
      participantId: [ownerId, participantId], 
      // 👆 o backend espera array, então coloque os dois
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar conversa:", error);
    throw error;
  }
}
