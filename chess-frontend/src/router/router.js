import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedPage from "../pages/ProtectedPage";
import CreateJoinRoomPage from "../pages/CreateJoinRoomPage";
import LiveGamePage from "../pages/LiveGamePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/login',
            element: <LoginPage />
        }
    ]
  },
  {
    path: "/play",
    exact: true,
    element: <ProtectedPage />,
    children: [
        {
            path: '',
            element: <CreateJoinRoomPage />
        },
        {
            path: 'room/:id',
            element: <LiveGamePage />
        }
    ]
  },
]);
