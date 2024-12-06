import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../subscriber/theme.subscriber";

function App() {
  const { gradient } = useTheme();
  return (
    <div className={`bg-gradient-to-r ${gradient} min-h-screen`}>
      <a href="/login">
        <h1>Login</h1>
      </a>
      <a href="/blogs">
        <h1>Blogs</h1>
      </a>
      <Outlet />
    </div>
  );
}

export default App;
