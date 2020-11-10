import React from "react";

import "./SidebarOption.css";
import { useDataLayerValue } from "../../context/DataLayer";

function SidebarOption({ spotify, uri, title, Icon }) {
  const [{ limit, offset }, dispatch] = useDataLayerValue();

  const dispatchPlaylist = () => {
    var playlistUri = uri.split(":")[2];

    spotify
      .getPlaylist(playlistUri)
      .then((playlist) => {
        dispatch({
          type: "SET_CHOOSEN_PLAYLIST",
          choosenPlaylist: playlist,
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

    switch (title) {
      case "Your Library":
        console.log("your library hit");
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
              choosenPlaylist: response,
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
