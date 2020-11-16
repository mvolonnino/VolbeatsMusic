import React from "react";

import "./SidebarOption.css";
import { useDataLayerValue } from "../../context/DataLayer";

function SidebarOption({ spotify, uri, title, Icon }) {
  const [{ limit }, dispatch] = useDataLayerValue();

  const dispatchPlaylist = () => {
    dispatch({
      type: "SET_OFFSET",
      offset: 0,
    });
    var playlistUri = uri.split(":")[2];

    spotify
      .getPlaylist(playlistUri)
      .then((playlist) => {
        dispatch({
          type: "SET_CHOOSEN_PLAYLIST",
          choosenPlaylist: playlist,
        });
        spotify
          .getPlaylistTracks(playlistUri, { limit: limit, offset: 0 })
          .then((tracks) => {
            dispatch({
              type: "SET_CHOOSEN_PLAYLIST",
              choosenPlaylist: {
                ...playlist,
                runCheckedSongs: true,
                tracks: tracks,
              },
            });
          });
      })
      .catch((err) => {
        console.log({ err });
        dispatch({
          type: "SET_ALERT_MESSAGE",
          alertMessage: {
            message: `Error Setting User's Playlist - Try Again`,
            open: true,
          },
        });
      });
  };

  const getUserTracks = () => {
    console.log({ title });
    dispatch({
      type: "SET_OFFSET",
      offset: 0,
    });
    switch (title) {
      case "Your Library":
        spotify
          .getMySavedTracks({ limit: limit, offset: 0 })
          .then((tracks) => {
            dispatch({
              type: "SET_USER_TRACKS",
              userTracks: {
                tracks: tracks,
                runCheckedSongs: true,
                name: "Your Library",
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
                message: `Error Fetching ${title} - Try Again`,
                open: true,
              },
            });
          });
        break;
      case "Home":
        spotify
          .getPlaylist("37i9dQZEVXcDizIFCfhpad", { limit: 30 })
          .then((response) => {
            dispatch({
              type: "SET_CHOOSEN_PLAYLIST",
              choosenPlaylist: {
                ...response,
                runCheckedSongs: true,
              },
            });
          })
          .catch((err) => {
            console.log({ err });
            dispatch({
              type: "SET_ALERT_MESSAGE",
              alertMessage: {
                message: `Error Fetching Discover Weekly - Try Again`,
                open: true,
              },
            });
          });
        break;
      default:
        return;
    }
  };

  return (
    <div className="sidebar_option">
      {Icon && <Icon className="sidebar_optionIcon">{Icon}</Icon>}
      {Icon ? (
        <h4 onClick={getUserTracks}>{title}</h4>
      ) : (
        <p onClick={dispatchPlaylist}>{title}</p>
      )}
    </div>
  );
}

export default SidebarOption;
