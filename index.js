const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { formattedMessage } = require('./utils/message');
const { addUser, getAllUsers, getUser, removeUser } = require('./utils/user');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001"
    }
});


const messagesArray = [];

const botName = "SnapSkoot bot";

io.on("connection", (socket) => {
    console.log("You are successfully connected");
    console.log(socket.id);
    const username = socket.handshake.query.username;
    console.log(`${username} connected`);

    socket.on("joinRoom", ({ username, room }) => {
        console.log("room and username", { username, room });
        socket.join(room);
        const user = { username, id: socket.id, room };
        addUser(user);

        socket.emit("message", formattedMessage(`Hello, ${username}. Welcome to room1`, botName));

        socket.broadcast.to("room1").emit("message", formattedMessage(`${username} has joined the chat`, botName));
        const allUsers = getAllUsers();
        io.in(room).emit("users", allUsers);
    });

    socket.on("message", (data) => {
        const user = getUser(socket.id);
        const messageDetails = formattedMessage(data, user.username);
        messagesArray.push(data);
        io.to(user.room).emit("message", messageDetails);
        console.log(messageDetails);
    });

    socket.on("removeUser", () => {
        const remainingUsers = removeUser(socket.id);
        socket.disconnect();
        console.log("post removal", remainingUsers);
        const room = remainingUsers?.[0]?.room;
        if (room) {
            io.in(remainingUsers[0].room).emit("users", remainingUsers);
            socket.broadcast.to("room1").emit("message", formattedMessage(`${username} has left the chat`, botName));
        }
    });
});

httpServer.listen(3000, () => {
    console.log("Listening on port 3000");
})


