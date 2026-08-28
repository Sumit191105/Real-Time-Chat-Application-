const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const users = [];

io.on("connection", (socket) => {

    console.log("USER CONNECTED:", socket.id);


    // =========================
    // USER JOINS
    // =========================

    socket.on("user-joined", (username) => {

        // Prevent joining twice
        if (socket.inChat) {
            return;
        }

        socket.username = username;
        socket.inChat = true;

        users.push(username);

        console.log(username, "joined the server");

        // Tell everyone that a user joined
        io.emit(
            "user-joined",
            `${username} joined the server`
        );

        // Send updated user list
        io.emit("users", users);

    });


    // =========================
    // USER SENDS MESSAGE
    // =========================

    socket.on("user-message", (message) => {

        // Don't allow messages before joining
        if (!socket.inChat) {
            return;
        }

        io.emit("message", {

            username: socket.username,
            message: message

        });

    });


    // =========================
    // USER CLICKS LEAVE CHAT
    // =========================

    socket.on("leave-chat", () => {

        // Already left
        if (!socket.inChat) {
            return;
        }

        const index = users.indexOf(socket.username);

        if (index !== -1) {
            users.splice(index, 1);
        }

        console.log(socket.username, "left the chat");

        // Tell everyone
        io.emit(
            "user-left",
            `${socket.username} left the server`
        );

        // Send updated user list
        io.emit("users", users);

        // Mark user as no longer inside chat
        socket.inChat = false;
        socket.username = null;

    });


    // =========================
    // USER CLOSES TAB / BROWSER
    // =========================

    socket.on("disconnect", () => {

        // If user already clicked Leave Chat,
        // they have already been removed.
        if (!socket.inChat) {
            console.log("SOCKET DISCONNECTED:", socket.id);
            return;
        }

        const index = users.indexOf(socket.username);

        if (index !== -1) {
            users.splice(index, 1);
        }

        console.log(socket.username, "left the server");

        // Tell everyone
        io.emit(
            "user-left",
            `${socket.username} left the server`
        );

        // Send updated user list
        io.emit("users", users);

    });

});


app.use(express.static(path.join(__dirname, "public")));


server.listen(9000, () => {

    console.log("SERVER STARTED ON PORT 9000");

});