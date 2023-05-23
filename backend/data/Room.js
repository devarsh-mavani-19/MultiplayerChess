const { Chess } = require("chess.js");

let rooms = {};
let socketToRooms = {}; // maps socket id to rooms

class Room {
  constructor(roomId) {
    this.gameState = 0; // 0 means not started 1 = started/playing 2 = completed
    this.roomId = roomId;
    this.game = new Chess();

    this.winner = undefined; // player
    this.players = {};
    this.joinCount = 0;

    rooms[roomId] = this;
  }

  getGameState() {
    return this.gameState;
  }
  startGame() {
    this.gameState = 1;
  }
  stopGame() {
    this.gameState = 2;
  }

  isMoveValid(move) {
    console.log("Checking Move")
    try {
      this.game.move({
        from: move.source,
        to: move.dest,
        promotion: 'q'
      });
      console.log(move);
      return true;
    } catch (e) {
        console.log(e)
      return false;
    }
  }
}
module.exports.Room = Room;
module.exports.verifyRoomExists = (roomId) => {
  return rooms[roomId] != undefined;
};

module.exports.getRoomById = (roomId) => {
  return rooms[roomId];
};

module.exports.getRoomByClientId = (clientId) => {
  return socketToRooms[clientId];
};

module.exports.addClientIdToRoom = (clientId, room) => {
  socketToRooms[clientId] = room;
};
