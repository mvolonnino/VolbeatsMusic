import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { getTokenFromUrl } from "./helpers/spotify/spotify";

function App() {
  useEffect(() => {
    const token = getTokenFromUrl();
    console.log("TOKEN 🔑", token);
  }, []);

  return (
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
