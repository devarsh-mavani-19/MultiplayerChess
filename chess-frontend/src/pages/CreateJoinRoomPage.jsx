import { useNavigate } from "react-router-dom";
import { roomApi } from "../api/roomApi";
import { useState } from "react";

function CreateJoinRoomPage() {
    let navigate = useNavigate()
    const [roomId, setRoomId] = useState('')
  const createRoom = async () => {
    try {
        let res = await roomApi.createRoom()
        console.log(res)
        navigate(`/play/room/${res.roomId}`)
    } catch(err) {
        console.log(err)
    }
  };
  const joinRoom = async () => {
    try {
        let res = await roomApi.joinRoom({
            roomId: roomId
        })
        console.log(res)
        navigate(`/play/room/${res.roomId}`)
    } catch(er) {
        console.log(er)
    }
  }
  return (
    <>
      <h1>Create or join a room</h1>
      <button onClick={createRoom}>Create a room</button>
      <hr />
      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="Enter room id" />
      <button onClick={joinRoom}>Join Room</button>
    </>
  );
}

export default CreateJoinRoomPage;
