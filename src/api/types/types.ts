export interface CreateConversationProps {
  title: string;
  participantId: string | string[];
  ownerId: string;
}
export interface JwtPayload {
  id: string;
}
export interface Message {
  id: string;
  content: string;
  conversationId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
}
