import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../subscriber/theme.subscriber";
import Header from "../components/Header";

function App() {
  const { gradient } = useTheme();
  const Headers = [
    { path: "/", text: "Home" },
    { path: "/login", text: "Login" },
    { path: "/blogs", text: "Blogs" },
  ];

  return (
    <div className={`bg-gradient-to-r ${gradient} min-h-screen py-20 px-4`}>
      {Header(Headers)}
      <Outlet />
    </div>
  );
}

export default App;
