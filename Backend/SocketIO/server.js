// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";

// export const app = express();
// export const server = createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: ["https://chat-app-kartik143.onrender.com"], 
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });


// const users = {};

// export const getReceiverSocketId = (receiverId) => users[receiverId];

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     users[userId] = socket.id;
//     console.log("Current online users:", users);
//   }

//   io.emit("getOnlineUsers", Object.keys(users));

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//     if (userId) delete users[userId];
//     io.emit("getOnlineUsers", Object.keys(users));
//   });
// });


import { Server } from "socket.io";

let io;
const users = {};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3001",
        "https://chat-app-kartik143.onrender.com",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
      console.log("Online users:", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId) delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
    });
  });
};

export const getReceiverSocketId = (receiverId) => users[receiverId];
export const getIO = () => io;
