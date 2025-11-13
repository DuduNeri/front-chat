export interface Messagelist {
  id: string;
  text: string;
  sender: "user" | "assistant";
}
export interface Chat {
  id: string;
  title: string;
  ownerId: string;
  participantId: string;
  createdAt: string;
}
