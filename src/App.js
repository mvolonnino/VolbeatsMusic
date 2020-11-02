import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { getTokenFromUrl } from "./helpers/spotify/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";
import { useDataLayerValue } from "./context/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token, offset, limit }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    window.location.hash = "";

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMyDevices((err, res) => {
        if (err) throw err;
        console.log(res);
        dispatch({
          type: "SET_MY_DEVICES",
          myDevices: res.devices.map((device) => device),
        });
      });

      spotify
        .getMe()
        .then((user) => {
          dispatch({
            type: "SET_USER",
            user: user,
          });
        })
        .catch((err) => {
          console.log({ err });
        });

      spotify
        .getMySavedTracks({ limit: limit, offset: offset })
        .then((tracks) => {
          dispatch({
            type: "SET_USER_TRACKS",
            userTracks: {
              tracks: tracks,
            },
          });
        })
        .catch((err) => {
          console.log({ err });
        });

      spotify
        .getUserPlaylists()
        .then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: playlists,
          });
        })
        .catch((err) => {
          console.log({ err });
        });

      spotify
        .getPlaylist("37i9dQZEVXcDizIFCfhpad", { limit: 30 })
        .then((response) => {
          dispatch({
            type: "SET_CHOOSEN_PLAYLIST",
            choosenPlaylist: response,
          });
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [dispatch, limit, offset]);

  // console.log("🔑 | 👩‍💻", { token, user });
  // console.log("USER TRACKS", { userTracks });
  // console.log("PLAYLISTS", { playlists });
  // console.log("CHOOSENPLAYLIST", { choosenPlaylist });
  // console.log("OFFSET", { offset });
  // console.log("WEB PLAYER", { web_player });

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
