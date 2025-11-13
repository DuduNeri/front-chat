export async function getChat(userId: string, token: string) {
  try {
    const response = await fetch(
      `http://localhost:4000/api/conversation/user/${userId}`, // ✅ adicionada a barra
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Erro ao listar conversas desse usuário");

    return await response.json();
  } catch (error) {
    console.error("Erro ao listar conversas:", error);
    return [];
  }
}
