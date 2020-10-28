import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "./Songs.css";
import { useDataLayerValue } from "../../context/DataLayer";
import SongRow from "../SongRow/SongRow";

function Songs() {
  const [{ discover_weekly }] = useDataLayerValue();
  return (
    <div className="songs">
      <div className="songs_icons">
        <PlayCircleFilledIcon className="play_button" />
        <FavoriteIcon className="favorite" fontSize="large" />
        <MoreHorizIcon className="more" />
      </div>
      {/* List of songs */}
      {discover_weekly?.tracks.items.map((item) => (
        <SongRow track={item.track} />
      ))}
    </div>
  );
}

export default Songs;
