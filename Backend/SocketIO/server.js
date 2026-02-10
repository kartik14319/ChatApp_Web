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

let io; // store io instance
const users = {};

// function to get io instance in controllers
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

// get receiver socket id
export const getReceiverSocketId = (receiverId) => users[receiverId];

// initialize socket
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3001",
        "http://localhost:5173",
        "https://chat-app-kartik143.onrender.com",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    const userId = socket.handshake.auth?.userId;
    if (userId) {
      users[userId] = socket.id;
      console.log("Current online users:", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
      if (userId) delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};
