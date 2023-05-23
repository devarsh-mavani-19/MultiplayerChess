const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const {
  addUsername,
  usernameExists,
  setUserForSocket,
} = require("./data/User");
const app = express();
const cors = require("cors");
const { generateRoomId } = require("./utils/index");
const {
  verifyRoomExists,
  getRoomById,
  Room,
  getRoomByClientId,
  addClientIdToRoom,
} = require("./data/Room");
app.use(cors());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  console.log("client connected ", client.id);
  client.on("join_room", (data) => {
    let { username, roomId } = data;
    setUserForSocket(client.id, username);

    let room = getRoomById(roomId);
    if (!room.players[username].joined) {
      room.players[username].socket = client.id;
      room.players[username].joined = true;
      room.joinCount++;
      client.join(roomId);
      if (room.joinCount == 1) {
        client.emit('assign_color', 'white')
      } else {
        client.emit('assign_color', 'black')
      }
      addClientIdToRoom(client.id, room)
    }
    if (room.joinCount == 2) {
      console.log(room.game.fen());
      io.to(roomId).emit("start_game", room.game.fen());
    }
  });

  client.on("move", (data) => {
    const { source, dest, color } = data;
    let room = getRoomByClientId(client.id);
    if (room.isMoveValid(data)) {
      io.to(room.roomId).emit("move", data);
    } else {
      console.log('Move invalid')
    }
  });

  client.on("disconnect", () => {
    console.log("client disconnected");
  });
});

app.use(express.json());
app.use((req, res, next) => {
  next();
});

let verifyUsername = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    req.username = token;
    if (!usernameExists(token)) {
      res.status(401).json("Unauthorized");
    } else {
      next();
    }
  } else {
    res.status(401).json("Unauthorized");
  }
};

app.post("/api/v1/users", (req, res) => {
  try {
    addUsername(req.body.username);
    res.status(200).json("User created");
  } catch (er) {
    console.log(er);
    res.status(500).json(er);
  }
});

app.post("/api/v1/rooms/create", verifyUsername, (req, res) => {
  try {
    let username = req.username;
    let room = new Room(generateRoomId());
    room.players[username] = {
      socket: undefined,
      joined: false,
      username: username,
      color: "w",
    };
    res.status(200).json(room);
  } catch (er) {
    console.log(er);
    res.status(500).json(er);
  }
});

app.post("/api/v1/rooms/join/", verifyUsername, (req, res) => {
  try {
    let username = req.username;
    let roomid = req.body.roomId;
    if (verifyRoomExists(roomid)) {
      let room = getRoomById(roomid);
      room.players[username] = {
        socket: undefined,
        joined: false,
        username: username,
        color: "b",
      };
      res.status(200).json(room);
    } else {
      res.status(404).json("Room not found");
    }
  } catch (er) {
    console.log(er);
    req.status(500).json(er);
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(process.env.PORT || 5000);
