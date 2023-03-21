const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001"
    }
});

let userDetails = [];
const messagesArray = [];

io.on("connection", (socket) => {
    console.log("You are successfully connected");
    console.log(socket.id);
    const username = socket.handshake.query.username;
    console.log(`${username} connected`);

    socket.join("room1");

    socket.on("userDetails", (data) => {
        console.log("user", data);
        userDetails.push(data);
        io.in("room1").emit("users", userDetails);
    });

    socket.on("allUsers", () => {
        console.log("all users emit");
        io.in("room1").emit("users", userDetails);
    });

    socket.on("message", (data) => {
        messagesArray.push(data);
        socket.broadcast.emit("message", data);
        console.log(messagesArray);
    });
});

httpServer.listen(3000, () => {
    console.log("Listening on port 3000");
})


