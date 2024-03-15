import React from "react";
import { createRoot } from 'react-dom/client';
import "../assets/stylesheets/styles.scss";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

function getElement(
    id: string
): HTMLElement | null {
    return  document.getElementById(id);
}
// Render your React component instead
const root = createRoot(getElement( "app" )!);
// const root = createRoot(document.getElementById("app")!);
root.render(<h1>Hi, world</h1>);