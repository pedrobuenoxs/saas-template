import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import AuthSubscriber from "./subscriber/auth.subscriber";
import NotFound from "./pages/not-found";
import { ThemeProvider } from "./subscriber/theme.subscriber";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Blogs from "./pages/blogs";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      { element: <NotFound />, path: "*" },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <AuthSubscriber />
    </ThemeProvider>
  </React.StrictMode>
);
