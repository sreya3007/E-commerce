import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth); //extracting useinfo from authslice
    return userInfo && userInfo.isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to='/login' replace />
    );//If userInfo doesn't exist or userInfo.isAdmin is false, it navigates the user to the login page using the Navigate component.
};
export default AdminRoute;