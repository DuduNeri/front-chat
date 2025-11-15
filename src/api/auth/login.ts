import { api } from "../conect";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const response = await api.post("/api/users/user", {
    name,
    email,
    password,
  });

  return response;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post("/api/login", { email, password });

  // ✔ Salva usuário, token e id no localStorage
  localStorage.setItem("userName", response.data.user.name);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.user.id);

  return response;
}
