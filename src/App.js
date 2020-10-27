import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { getTokenFromUrl } from "./helpers/spotify/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        console.log("USER 👩‍💻", user);
      });
    }

    console.log("TOKEN 🔑", { _token });
  }, []);

  return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
