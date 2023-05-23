import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedPage() {
    let user = useSelector(state => state.user)
    let navigate = useNavigate()
    if (!user.isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default ProtectedPage;