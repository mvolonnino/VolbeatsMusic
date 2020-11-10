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
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMyDevices((err, res) => {
        if (err) throw err;
        console.log(res);
        dispatch({
          type: "SET_MY_DEVICES",
          myDevices: res?.devices?.map((device) => device),
        });
        dispatch({
          type: "SET_VOLUME_LEVEL",
          volumeLvl: res?.devices[0]?.volume_percent,
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
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message: `Error Fetching User Data - Refresh Page`,
              open: true,
            },
          });
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
          dispatch({
            type: "SET_CHOOSEN_PLAYLIST",
            choosenPlaylist: tracks,
          });
        })
        .catch((err) => {
          console.log({ err });
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message: `Error Fetching User Liked Songs - Refresh Page`,
              open: true,
            },
          });
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
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message: `Error Fetching User Playlists - Refresh Page`,
              open: true,
            },
          });
        });
    }
  }, [dispatch, limit, offset]);

  // console.log("🔑 | 👩‍💻", { token, user });
  // console.log("USER TRACKS", { userTracks });
  // console.log("PLAYLISTS", { playlists });
  // console.log("CHOOSENPLAYLIST", { choosenPlaylist });
  // console.log("OFFSET", { offset });
  // console.log("MY DEVICES", { myDevices });

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
