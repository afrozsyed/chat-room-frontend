import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client | null = null;

export const connectWebSocket = (
  chatRoomId: string,
  onMessage: (msg: any) => void
) => {
  const socket = new SockJS(import.meta.env.VITE_WS_URL);

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      stompClient?.subscribe(`/topic/chatroom/${chatRoomId}`, (message) => {
        onMessage(JSON.parse(message.body));
      });
    },
  });

  stompClient.activate();
};

export const sendMessage = (message: any) => {
  stompClient?.publish({
    destination: "/app/sendMessage",
    body: JSON.stringify(message),
  });
};