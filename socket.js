const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const server = require("http").createServer(app);
const User = require("./models/user");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const port = 7000;

server.listen(port, () => {
  console.log("Server listening at port %d", port);
});

// Routing
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: [
      "https://addictivemediafrontend.vercel.app",
      "http://127.0.0.1:3000/",
      "http://127.0.0.1:3001",
      "http://localhost:3000",
      "http://localhost:8000",
    ],
  })
);
// Chatroom

let numUsers = 0;
let allUsers = [];
app.get("/onlinestatus/:id", async (req, res) => {
  const user = allUsers.filter((a) => a.userid == req.params.id);
  res.send(user);
});

io.on("connection", (socket) => {
  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on("new message", (data) => {
    // we tell the client to execute 'new message'
    let socketid = allUsers.find((a) => a.userid == data.recieverid);

    if (socketid) {
      socket.to(socketid.id).emit("new message", {
        username: "socket.username",
        message: data,
      });
    }
  });

  // when the client emits 'add user', this listens and executes
  socket.on("add user", (data) => {
    if (addedUser) return;
    allUsers = allUsers.filter((a) => !(a.userid == data.userid));
    allUsers.push({ id: socket.id, userid: data.userid });
    // we store the username in the socket session for this client
    socket.username = "username";
    ++numUsers;
    addedUser = true;
    socket.emit("login", {
      numUsers: numUsers,
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("user joined", {
      username: "socket.username",
      numUsers: numUsers,
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on("typing", (data) => {
    u = allUsers.find((a) => a.userid == data.recieverid);
    if (u) {
      socket.to(u?.id).emit("typing", {
        userid: data.userid,
      });
    }
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username,
    });
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", async () => {
    u = allUsers.find((a) => a.id == socket.id && a.userid);
    if (u?.userid) {
      await User.update({ last_seen: new Date() }, { where: { id: u.userid } });
    }
    allUsers = allUsers.filter((a) => !(a.id == socket.id));
  });
});
