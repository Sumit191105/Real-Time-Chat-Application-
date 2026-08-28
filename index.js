const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {

    console.log("USER CONNECTED:", socket.id);

    // User joins
    socket.on("user-joined", (username) => {

        socket.username = username;

        console.log(username, "joined the server");

        io.emit("user-joined", `${username} joined the server`);
    });

    // User sends message
    socket.on("user-message", (message) => {

        io.emit("message", {
            username: socket.username,
            message: message
        });

    });

});

app.use(express.static(path.join(__dirname, "public")));

server.listen(9000, () => {
    console.log("SERVER STARTED ON PORT 9000");
});