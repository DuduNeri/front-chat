export async function listAllUsers(token: string) {
  try {
    const response = await fetch("http://localhost:4000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao listar usuários");

    return await response.json();
  } catch (error) {
    console.error("Erro listAllUsers:", error);
    return [];
  }
}
