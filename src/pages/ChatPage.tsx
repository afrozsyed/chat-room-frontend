import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMessages } from "../api/ChatApi";
import { connectWebSocket, sendMessage } from "../websocket/Socket";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import Box from "@mui/material/Box";

export default function ChatPage() {
  const { state }: any = useLocation();
  const { name, roomId } = state;
  const [messages, setMessages] = React.useState<any[]>([]);

  useEffect(() => {
    // Load history
    getMessages(roomId).then((res) => {
      setMessages(res.data.data);
    });

    // Connect WebSocket
    connectWebSocket(roomId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSend = (content: string) => {
    sendMessage({
      chatRoomId: roomId,
      sender: name,
      content,
    });
  };

 return (
    <Box
      sx={{
        height: "98vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatHeader roomId={roomId} />
      <MessageList messages={messages} currentUser={name} />
      <MessageInput onSend={handleSend} />
    </Box>
  );
}
