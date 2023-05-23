import { useState } from "react";
import { userApi } from "../api/userApi";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/userSlice";
import { redirect, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const handleSubmit = async () => {
    try {
        let res = await userApi.registerUsername({
            username
        })
        dispatch(loginUser({ username }))
        navigate('/')
    } catch(err) {
        console.log(err)
    }
    
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Start Playing</button>
    </div>
  );
}

export default LoginPage;
