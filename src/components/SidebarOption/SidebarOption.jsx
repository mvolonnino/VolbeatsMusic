import React from "react";

import "./SidebarOption.css";
import { useDataLayerValue } from "../../context/DataLayer";

function SidebarOption({ spotify, uri, title, Icon }) {
  const [{ userTracks }, dispatch] = useDataLayerValue();

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
      });
  };

  const getUserTracks = () => {
    console.log({ title });
    console.log({ spotify });

    switch (title) {
      case "Your Library":
        dispatch({
          type: "SET_CHOOSEN_PLAYLIST",
          choosenPlaylist: userTracks,
        });
        break;
      case "Home":
        spotify
          .getPlaylist("37i9dQZEVXcDizIFCfhpad")
          .then((response) => {
            dispatch({
              type: "SET_CHOOSEN_PLAYLIST",
              choosenPlaylist: response,
            });
          })
          .catch((err) => {
            console.log({ err });
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
