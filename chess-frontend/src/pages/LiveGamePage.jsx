import { useEffect, useState } from "react";
import { mySocketId, socket } from "../socket/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
let game = new Chess();

function LiveGamePage() {
  let username = useSelector((state) => state.user.username);
  let { id: gameId } = useParams();
  const [pgn, setPGN] = useState(game.fen());
  const [isGameStarted, setGameStarted] = useState(false);
  const [color, setColor] = useState('white')

  useEffect(() => {
    console.log("emitting ", mySocketId, socket);
    socket.emit("join_room", {
      username: username,
      roomId: gameId,
    });

    socket.on('assign_color', color => {
        setColor(color)
    })

    socket.on("start_game", (pgn) => {
      // show chess board and initialize game state
      console.log("Game started", pgn);
      setPGN(pgn);
      setGameStarted(true);
    });
    socket.on("move", (move) => {
      try {
        game.move({
          from: move.source,
          to: move.dest,
          promotion: "q",
        });
        console.log("PGN", game.fen())
        setPGN(game.fen())
      } catch (er) {}
    });
  }, []);

  const handlePieceDrop = (source, dest, color) => {
    try {
      let res = game.move({
        from: source,
        to: dest,
        promotion: "q",
      });
      console.log(res);
      setPGN(game.fen());
      socket.emit("move", {
        username: username,
        source,
        dest,
        color,
      });
      console.log(game.fen())
    } catch (Er) {console.log(Er, game.fen())}
  };

  return (
    <div>
      {isGameStarted ? (
        <Chessboard
          position={pgn}
          onPieceDrop={handlePieceDrop}
          boardWidth={500}
          boardOrientation={color}
          isDraggablePiece={(piece) => {
            console.log(color == 'white' && piece.piece.indexOf('w')!=-1)
            if (color == 'white' && piece.piece.indexOf('w')!=-1) {
                return true;
            } else if (color == 'black' && piece.piece.indexOf('b')!=-1) {
                return true;
            } else {
                return false;
            }
          }}
        />
      ) : (
        <p>Waiting for other player to join</p>
      )}
    </div>
  );
}

export default LiveGamePage;
