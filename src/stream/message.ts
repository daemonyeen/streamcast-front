export type MessageDto = Readonly<{
  id: string;
  author: string;
  message: string;
  photoUrl?: string;
  likes: number;
  liked: boolean;
  created: string;
}>;

export type SendMessageDto = Readonly<{
  message: string;
  room: string;
  author: string;
}>;
