import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import "./config/database.js";

const server = http.createServer(app);

// 👇 Export io
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Make io available to controllers (keep this)
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket Connected:", socket.id);

  socket.on("join-room", (sessionCode) => {
    socket.join(sessionCode);
  });

  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});