import { Box, Typography } from "@mui/material";

type Message = {
  sender: string;
  content: string;
  timestamp: string;
};

export default function MessageBubble({
  msg,
  isOwn,
}: {
  msg: Message;
  isOwn: boolean;
}) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={isOwn ? "flex-end" : "flex-start"}
      mb={2}
    >
      {/* Sender name (only for received messages) */}
      {!isOwn && (
        <Typography
          variant="caption"
          sx={{
            mb: 0.5,
            px: 1,
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          {msg.sender}
        </Typography>
      )}

      {/* Row: bubble + time */}
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection={isOwn ? "row-reverse" : "row"}
        gap={0.8}
      >
        {/* Bubble */}
        <Box
          sx={{
            maxWidth: "70%",
            px: 2,
            py: 1.2,
            borderRadius: 1,
            backgroundColor: isOwn ? "#6366f1" : "#f3f4f6",
            color: isOwn ? "#fff" : "#111827",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
            {msg.content}
          </Typography>
        </Box>

        {/* Time (outside bubble) */}
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.7rem",
            minWidth: "40px",
            textAlign: isOwn ? "right" : "left",
          }}
        >
          {formatTime(msg.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
}