import { AppBar, Toolbar, Typography } from "@mui/material";

export default function ChatHeader({ roomId }: { roomId: string }) {
  return (
    <AppBar  position="static" sx={{ background: "#075e54" }} elevation={1}>
      <Toolbar>
        <Typography variant="h6">Chat Room: {roomId}</Typography>
      </Toolbar>
    </AppBar>
  );
}