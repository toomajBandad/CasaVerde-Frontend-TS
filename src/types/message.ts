export interface Message {
  _id: string;
  senderId: string; // ObjectId as string
  senderName: string;
  receiverId: string; // ObjectId as string
  receiverName: string;
  roomId: string; // ObjectId as string
  message: string;
  time?: string;
  date?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string;
}
