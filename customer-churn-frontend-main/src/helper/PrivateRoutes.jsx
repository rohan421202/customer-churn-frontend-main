import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let isloggedIn = JSON.parse(localStorage.getItem("userInfo") !== null)
    return (
        isloggedIn ? <Outlet/> : <Navigate to={'/login'}/>
    )
}

export default PrivateRoutes;