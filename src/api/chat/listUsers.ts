import { api } from "../conect";

export async function listAllUsers() {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Erro listAllUsers:", error);
    return [];
  }
}
