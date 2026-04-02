export interface ChatRoomResponse {
  id: string;
  name: string;
  createdAt: string;
}

export interface MessageResponse {
  id: string;
  chatRoomId: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}