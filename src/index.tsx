import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    RouterProvider,
} from "react-router-dom";
import "../assets/stylesheets/styles.scss";
import App from './pages/App';
// import router from './router';

function getElement(
    id: string
): HTMLElement | null {
    return document.getElementById(id);
}

// Render your React component instead
const root = createRoot(getElement("app")!);
root.render(
    <React.StrictMode>
        {/* <RouterProvider router={router} /> */}
        <App/>
    </React.StrictMode>
);