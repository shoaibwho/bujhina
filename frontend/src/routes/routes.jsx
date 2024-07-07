import { createBrowserRouter } from "react-router-dom";
import Homepage from "../components/Homepage/Homepage";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import NewPassword from "../components/NewPassword/NewPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Welcome</h1>,
    },
    {
        path: "/home",
        element: <Homepage />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/reset",
        element: <ResetPassword />,
    },
    {
        path: "/reset/:token",
        element: <NewPassword />,
    },
    {
        path: "/post-problems",
        element: <problem />,
    },
]);

export default router;
