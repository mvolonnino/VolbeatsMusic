import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import "./Songs.css";
import { useDataLayerValue } from "../../context/DataLayer";
import SongRow from "../SongRow/SongRow";

function Songs() {
  const [{ choosenPlaylist, song }, dispatch] = useDataLayerValue();

  const setShuffleSong = () => {
    var songs = choosenPlaylist?.tracks.items.map((item) => item);
    console.log(songs);
    var songIndex = Math.floor(Math.random() * songs.length);
    console.log(songIndex);
    dispatch({
      type: "SET_SONG",
      song: {
        track: songs[songIndex].track,
        index: songIndex,
      },
    });
  };

  console.log({ song });
  return (
    <div className="songs">
      <div className="songs_icons">
        <PlayCircleFilledIcon
          className="play_button"
          onClick={setShuffleSong}
        />
        <FavoriteIcon className="favorite" fontSize="large" />
        <MoreHorizIcon className="more" />
      </div>
      <hr />
      {/* List of songs */}
      {choosenPlaylist?.tracks.items.map((item, i) => (
        <SongRow track={item.track} index={i} key={i} />
      ))}
    </div>
  );
}

export default Songs;
