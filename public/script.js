const socket = io();

let hasJoined = false;


// =========================
// HTML ELEMENTS
// =========================

const usernameInput =
    document.getElementById("username");

const joinButton =
    document.getElementById("joinButton");

const leaveButton =
    document.getElementById("leaveButton");

const messageInput =
    document.getElementById("message");

const sendButton =
    document.getElementById("sendButton");

const allMessages =
    document.getElementById("messages");

const allUsers =
    document.getElementById("users");


// =========================
// HELPER FUNCTION
// =========================

function scrollDown() {

    allMessages.scrollTop =
        allMessages.scrollHeight;

}


// =========================
// JOIN CHAT
// =========================

joinButton.addEventListener("click", () => {

    const username =
        usernameInput.value.trim();

    if (username === "" || hasJoined) {
        return;
    }

    hasJoined = true;

    socket.emit("user-joined", username);

});


// =========================
// USER JOINED
// =========================

socket.on("user-joined", (message) => {

    if (!hasJoined) {
        return;
    }

    const p =
        document.createElement("p");

    p.innerText = message;

    allMessages.appendChild(p);

    scrollDown();

});


// =========================
// ONLINE USERS
// =========================

socket.on("users", (users) => {

    if (!hasJoined) {
        return;
    }

    allUsers.innerHTML = "";

    users.forEach((username) => {

        const p =
            document.createElement("p");

        p.innerText = username;

        allUsers.appendChild(p);

    });

});


// =========================
// USER LEFT
// =========================

socket.on("user-left", (message) => {

    if (!hasJoined) {
        return;
    }

    const p =
        document.createElement("p");

    p.innerText = message;

    allMessages.appendChild(p);

    scrollDown();

});


// =========================
// SEND MESSAGE
// =========================

sendButton.addEventListener("click", () => {

    if (!hasJoined) {
        return;
    }

    const message =
        messageInput.value.trim();

    if (message === "") {
        return;
    }

    socket.emit("user-message", message);

    messageInput.value = "";

});


// =========================
// ENTER TO SEND
// =========================

messageInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        sendButton.click();

    }

});


// =========================
// RECEIVE MESSAGE
// =========================

socket.on("message", (data) => {

    if (!hasJoined) {
        return;
    }

    const p =
        document.createElement("p");

    p.innerText =
        `${data.username} : ${data.message}`;

    allMessages.appendChild(p);

    scrollDown();

});


// =========================
// LEAVE CHAT
// =========================

leaveButton.addEventListener("click", () => {

    if (!hasJoined) {
        return;
    }

    socket.emit("leave-chat");

    hasJoined = false;

    allUsers.innerHTML = "";

    usernameInput.value = "";

});