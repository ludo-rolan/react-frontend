import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import ErrorPage from "./error-page";
import React from "react";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><App /></PrivateRoute>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage />
    }
]);

export default router;