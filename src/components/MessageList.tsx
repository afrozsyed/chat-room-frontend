import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, currentUser }: any) {
    const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    // <Box sx={{ height: "80vh", overflowY: "auto", p: 2 }}>
    //   {messages.map((msg: any, index: number) => (
    //     <Box
    //       key={index}
    //       textAlign={msg.sender === currentUser ? "right" : "left"}
    //     >
    //       <Typography variant="body2">
    //         <b>{msg.sender}</b>: {msg.content}
    //       </Typography>
    //     </Box>
    //   ))}
    // </Box>
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        backgroundColor: "#ecebe0",
      }}
    >
      {messages.map((msg: any, index: number) => (
        <MessageBubble
          key={index}
          msg={msg}
          isOwn={msg.sender === currentUser}
        />
      ))}

      <div ref={bottomRef} />
    </Box>
  )
}
