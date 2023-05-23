import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const HomePage = () => {
  const auth = useSelector((state) => state.user);
  console.log(auth);
  return (
    <div>
      <h1>Welcome to home page </h1>
      {
        auth.isLoggedIn ? <Link to={"/play"}>Start Playing</Link> : <Link to={'/login'}>Login</Link>
      }
      
    </div>
  );
};

export default HomePage;
