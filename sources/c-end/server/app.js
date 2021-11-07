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

let arrOfUsers = [];
let arrOfChats = [];

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
  // Server akan mendengar ketika client mentrigger event ini
  socket.on("customEventFromClient", (payload) => {
    console.log("Terima payload: ", payload);

    // Server akan mengirimkan kembalian ke client
    // Dengan nama event customEventFromServer
    socket.emit("customEventFromServer", "Kembalian server");
  });

  socket.on("setUsername", (payload) => {
    arrOfUsers.push({
      username: payload,
      status: "online",
    });

    console.log(arrOfUsers);
  });

  // Ini adalah custom event buatan kita sendiri
  // Untuk menerima message yang dikirim dari client
  socket.on("sendMessageToServer", (payload) => {
    arrOfChats.push(payload);

    // Server akan mengembalikan respon ke client berupa
    // Seluruh chat yang ada

    // Pehatikan di sini kita menggunakan io, bukan socket,
    // untuk menargetkan seluruh client yang sedang ada
    // terhubung ke server
    io.emit("receiveMessageFromServer", arrOfChats);
  });
});

// listen http server pada port 3000
httpServer.listen(3000, () => {
  console.log("Listening on port 3000");
});
