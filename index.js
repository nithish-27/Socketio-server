const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: {
      origin: "https://localhost:3000",
      methods: ["GET", "POST"],
    },
  },
});
io.on("connection", (socket) => {
  console.log(`user connected:${socket.id}`);
  socket.on("join room", (data) => {
    socket.join(data.room);
  });
  socket.on("message", (data) => {
    socket.to(data.room).emit("received_message", data);
    // socket.broadcast.emit("received_message", data);
  });
});
server.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
