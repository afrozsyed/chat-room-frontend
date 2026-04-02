import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createChatRoom, getChatRoom } from "../api/ChatApi";

export default function JoinPage() {
  const [name, setName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!name.trim() || !roomId.trim()) {
      setError("Please fill all fields");
      return;
    }

    try {
      await getChatRoom(roomId);
      navigate("/chat", { state: { name, roomId } });
    } catch (err: any) {
      const confirmCreate = window.confirm(
        "Room not found. Do you want to create it?"
      );

      if (confirmCreate) {
        await createChatRoom({ id: roomId, name: roomId });
        navigate("/chat", { state: { name, roomId } });
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight={600} mb={1}>
          Join Chat
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your name and room ID to start chatting
        </Typography>

        {/* Name Input */}
        <TextField
          fullWidth
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Room ID Input */}
        <TextField
          fullWidth
          label="Room ID"
          variant="outlined"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Error */}
        {error && (
          <Typography color="error" variant="caption" mb={2} display="block">
            {error}
          </Typography>
        )}

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleJoin}
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Join Room
        </Button>
      </Paper>
    </Container>
  );
}