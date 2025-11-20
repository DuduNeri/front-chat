import { api } from "../conect";

export async function getMessages(conversationId: string) {
  const res = await api.get(`api/messages/${conversationId}`);
  return res.data; 
}
