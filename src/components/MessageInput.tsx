import { useState } from "react";
import { TextField, Box, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function MessageInput({ onSend }: { onSend: (content: string) => void }) {
  const [message, setMessage] = useState("");
  const maxLength = 200;

const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // enforce limit
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  return (
    <Box
      display="flex"
      p={2}
      gap={1}
      sx={{ borderTop: "1px solid #e5e7eb", background: "white" }}
    >
      {/* Input wrapper for counter positioning */}
      <Box sx={{ position: "relative", flex: 1 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline
              handleSend();
            }
          }}
          multiline
          maxRows={4}
          inputProps={{ maxLength }} // extra safety
          sx={{
            "& .MuiOutlinedInput-root": {
              pr: "60px", // space for counter
            },
          }}
        />

        {/* Character Counter */}
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 6,
            right: 10,
            fontSize: "0.7rem",
            color:
              message.length >= maxLength
                ? "error.main"
                : message.length > maxLength * 0.9
                ? "warning.main"
                : "text.secondary",
          }}
        >
          {message.length}/{maxLength}
        </Typography>
      </Box>
      <IconButton sx={{color: "#075e54"}} onClick={handleSend} disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}
