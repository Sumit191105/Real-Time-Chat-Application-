

## Real-Time Chat Application

A real-time web-based chat application built using **Node.js, Express.js, and Socket.IO**.

This project was built to understand how real-time communication works between multiple clients and a backend server using Socket.IO and persistent connections.

---

## 📌 Project Workflow

![Real-Time Chat Application - Project Flow](https://github.com/user-attachments/assets/a7e1b26e-1850-4831-af40-f43b1ce7e9ae)

---

## 🚀 Features

- Real-time messaging
- Multiple users can communicate simultaneously
- Username-based identification
- User join notifications
- User leave notifications
- Active users list
- Connect and disconnect functionality
- Real-time client-server communication
- Messages broadcast to connected users
- Send messages using the Enter key
- Terminal-inspired frontend interface
- Responsive frontend design
- Separate HTML, CSS, and JavaScript files

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- Socket.IO

### Tools

- Git
- GitHub
- VS Code

---

## 📌 Project Overview

The main purpose of this project is to understand the fundamentals of **real-time communication** and how a client and server can maintain an active connection.

Unlike traditional HTTP communication, where the client sends a request and waits for a response, Socket.IO allows the server and clients to communicate through events over an active connection.

The basic communication flow is:

```text
Client
   │
   │ Socket.IO Connection
   ▼
Server
   │
   │ Broadcast Events
   ▼
Connected Clients
````

---

## 🔄 Project Workflow

```text
User Opens Application
          │
          ▼
   Socket Connection
          │
          ▼
   Enter Username
          │
          ▼
    Click CONNECT
          │
          ▼
 "user-joined" Event
          │
          ▼
 Server Stores Username
          │
          ▼
 Active Users Updated
          │
          ▼
 User Can Send Messages
          │
          ▼
 "user-message" Event
          │
          ▼
      Server
          │
          ▼
    "message" Event
          │
          ▼
 Connected Users Receive Message
```

---

## 👥 User Management

The server maintains an array containing the users currently inside the chat.

```javascript
const users = [];
```

When a user joins the chat:

```text
User enters username
        ↓
Client emits "user-joined"
        ↓
Server receives username
        ↓
Username added to users[]
        ↓
Server broadcasts updated users
```

When a user leaves:

```text
User clicks DISCONNECT
        ↓
Client emits "leave-chat"
        ↓
Server removes username
        ↓
Server broadcasts updated users
```

The application also handles users who close their browser or tab using Socket.IO's `disconnect` event.

---

## 💬 Real-Time Messaging

When a user sends a message, the frontend emits an event:

```javascript
socket.emit("user-message", message);
```

The server receives the event:

```javascript
socket.on("user-message", (message) => {
    // handle message
});
```

The server then broadcasts the message:

```javascript
io.emit("message", {
    username: socket.username,
    message: message
});
```

Every connected client receives the message and displays it in the chat window.

---

## 📡 Socket.IO Events

The application uses several Socket.IO events.

### `user-joined`

Used when a user connects to the chat.

```text
Client → Server
```

---

### `users`

Used to send the current list of active users.

```text
Server → Clients
```

---

### `user-message`

Used when a user sends a chat message.

```text
Client → Server
```

---

### `message`

Used by the server to broadcast a chat message.

```text
Server → Clients
```

---

### `leave-chat`

Used when a user clicks the disconnect button.

```text
Client → Server
```

---

### `user-left`

Used to notify connected users that someone has left.

```text
Server → Clients
```

---

### `disconnect`

Triggered automatically by Socket.IO when a client's connection is closed.

```javascript
socket.on("disconnect", () => {
    // handle disconnected user
});
```

---

## 🔌 Persistent Connections

Socket.IO maintains an active connection between the browser and the server.

Instead of continuously sending HTTP requests to check whether something changed, the client and server can communicate through events.

```text
        Persistent Connection

Browser  ◄──────────────────►  Server
           Socket.IO
```

This makes Socket.IO useful for applications where information needs to be delivered quickly, such as:

* Chat applications
* Notifications
* Live dashboards
* Multiplayer applications
* Collaborative applications

---

## 🖥️ Frontend

The frontend contains:

* Username input
* Connect button
* Disconnect button
* Message input
* Send button
* Active users panel
* Chat message area
* Join notifications
* Leave notifications

The interface uses a **terminal-inspired design** with a dark background, amber text, green status indicators, and a command-line-style layout.

---

## 📂 Project Structure

```text
Real-Time-Chat-Application/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
│
└── public/
    │
    ├── index.html
    ├── style.css
    └── script.js
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <https://github.com/Sumit191105/Real-Time-Chat-Application->
```

### 2. Move into the project directory

```bash
cd Real-Time-Chat-Application
```

### 3. Install dependencies

```bash
npm install
```

---

## ▶️ Running the Application

Start the server:

```bash
node index.js
```

The server runs on:

```text
http://localhost:9000
```

Open the URL in your browser.

To test real-time communication, open the application in multiple browser tabs or windows and join using different usernames.

---

## 🧪 Testing

You can test the application by opening multiple clients.

### Example

```text
Browser 1
Username: Sumit

Browser 2
Username: Sahil
```

When Alex joins:

```text
Sahil joined the server
```

The active users list becomes:

```text
● Sumit
● Sahil
```

If Sumit sends:

```text
Hello!
```

the connected users receive:

```text
Sumit : Hello!
```

If Alex disconnects:

```text
Sahil left the server
```

The active users list is updated automatically.

---

## 🏗️ Architecture

```text
                    ┌─────────────────┐
                    │    Browser 1    │
                    │                 │
                    │ HTML/CSS/JS     │
                    └────────┬────────┘
                             │
                             │ Socket.IO
                             │
                             ▼
                    ┌─────────────────┐
                    │                 │
                    │   Node.js       │
                    │   Express.js    │
                    │   Socket.IO     │
                    │                 │
                    └────────┬────────┘
                             │
                             │ Socket.IO
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
     ┌─────────────────┐           ┌─────────────────┐
     │    Browser 2    │           │    Browser 3    │
     │                 │           │                 │
     │ HTML/CSS/JS     │           │ HTML/CSS/JS     │
     └─────────────────┘           └─────────────────┘
```

---

## 🧠 Key Concepts Learned

Through this project, I learned and practiced:

* Node.js
* Express.js
* HTTP servers
* Socket.IO
* Persistent connections
* Real-time communication
* Event-driven programming
* Client-server architecture
* Socket connections
* `socket.id`
* `socket.on()`
* `socket.emit()`
* `io.emit()`
* Broadcasting
* Managing user state
* Handling connections
* Handling disconnections
* DOM manipulation
* Dynamic UI updates
* Serving static files with Express

---

## 🔍 Client-Server Communication

The application follows an event-driven architecture.

### Sending a message

```text
User
 ↓
Frontend
 ↓
socket.emit()
 ↓
Socket.IO
 ↓
Node.js Server
 ↓
io.emit()
 ↓
Connected Clients
```

### User joining

```text
User enters username
        ↓
Frontend
        ↓
socket.emit("user-joined")
        ↓
Server
        ↓
users[]
        ↓
io.emit("users")
        ↓
All connected clients
```

### User leaving

```text
User clicks DISCONNECT
        ↓
socket.emit("leave-chat")
        ↓
Server
        ↓
Remove user from users[]
        ↓
io.emit("user-left")
        ↓
Update active users
```

---

## 🎨 Frontend Design

The frontend was designed with a terminal-inspired interface.

The design includes:

* Dark terminal-style background
* Amber typography
* Green active-user indicators
* Terminal-style buttons
* Active connection indicator
* Responsive layout
* Dedicated active-user panel
* Scrollable chat area

The frontend is separated into:

```text
index.html
    ↓
Structure

style.css
    ↓
Design

script.js
    ↓
Client-side logic
```

---

## 📈 Future Improvements

The project is currently being developed further.

Possible future improvements include:

* Typing indicators
* Private messaging
* Chat rooms
* Message timestamps
* Persistent message history
* Database integration
* User authentication
* Online/offline status
* Better error handling
* Message deletion
* Message editing
* File sharing
* Voice communication
* Video communication
* WebRTC integration
* Deployment

---

## 🎯 Learning Goal

The primary goal of this project is to understand the fundamentals required to build real-time applications.

The project focuses on understanding this architecture:

```text
Client
   ↓
Socket Event
   ↓
Server
   ↓
Process Event
   ↓
Broadcast Event
   ↓
Connected Clients
```

Understanding this pattern provides a foundation for building more advanced systems such as:

* Messaging applications
* Real-time dashboards
* Multiplayer applications
* Collaborative tools
* Notification systems
* Voice and video communication platforms

---

## 🚧 Project Status

**Ongoing**

The application is currently being improved with additional real-time communication and frontend features.

---

## 👨‍💻 Author

**Sumit Verma**

Computer Science

Interests:

* Data Structures & Algorithms
* Java
* Node.js
* Backend Development
* Real-Time Applications
* System Design

---

## 📌 Note

This project was built primarily as a **learning project** to understand Node.js, Express.js, Socket.IO, persistent connections, event-driven architecture, and real-time client-server communication.

````
