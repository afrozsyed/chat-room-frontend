import axios from "axios";
import { type ApiResponse, type ChatRoomResponse,type MessageResponse } from "../types/Chat";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getChatRoom = async (id: string) => {
  return axios.get<ApiResponse<ChatRoomResponse>>(`${API_BASE}/chatroom/${id}`);
};

export const createChatRoom = async (data: {
  id: string;
  name: string;
}) => {
  return axios.post<ApiResponse<ChatRoomResponse>>(
    `${API_BASE}/chatroom`,
    data
  );
};

export const getMessages = async (chatRoomId: string) => {
  return axios.get<ApiResponse<MessageResponse[]>>(
    `${API_BASE}/messages/${chatRoomId}`
  );
};