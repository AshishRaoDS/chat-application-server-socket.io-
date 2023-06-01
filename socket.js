const { Server } = require("socket.io");
const { formattedMessage } = require('./utils/message');
const { addUser, getAllUsers, getUser, removeUser } = require('./utils/user');

function createSocketConnection(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "*"
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

            socket.emit("message", formattedMessage(`Hello, ${username}. Welcome to ${room}.`, botName));

            socket.broadcast.to(room).emit("message", formattedMessage(`${username} has joined the chat`, botName));
            const allUsers = getAllUsers(room);
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
            const { allUsers: remainingUsers, removedUser } = removeUser(socket.id);
            socket.disconnect();
            console.log("post removal", remainingUsers);
            console.log("user removed", removedUser);
            const room = remainingUsers?.[0]?.room;
            if (room) {
                io.in(room).emit("users", remainingUsers);
                socket.broadcast.to(room).emit("message", formattedMessage(`${removedUser.username} has left the chat`, botName));
            }
        });
    });

}

module.exports = createSocketConnection;