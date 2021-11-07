const express = require("express");
// Di sini kita akan menggunakan HTTP untuk mengikat express dan socketio
// dalam satu tempat yang sama
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
// Ini adalah instance Socket.IO yang akan digunakan
const io = new Server(httpServer, {
  // Pada SocketIO versi 4 ke atas, harus mendefinisikan CORS
  cors: {
    origin: "*",
  },
});

// ini adalah "event" khusus socket io
// Terjadi ketika ada koneksi ke socket io
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Ini adalah event yang terjadi ketika user
  // terputus dari socket io
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Ini adalah custom event buatan kita sendiri
  socket.on("custom-event", (payload) => {
    console.log("Terima payload: ", payload);
  });
});

// listen http server pada port 3000
httpServer.listen(3000, () => {
  console.log("Listening on port 3000");
});
