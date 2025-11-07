export interface CreateConversationProps {
  title: string;
  participantId: string | string[];
  ownerId: string;
}
export interface JwtPayload {
  id: string;
}
