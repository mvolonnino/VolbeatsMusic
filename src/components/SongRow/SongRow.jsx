import React from "react";

import "./SongRow.css";
import { useDataLayerValue } from "../../context/DataLayer";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

function SongRow({ track, index }) {
  const [{ song }, dispatch] = useDataLayerValue();
  const pickSong = () => {
    console.log(track);
    dispatch({
      type: "SET_SONG",
      song: {
        track: track,
        index: index,
      },
    });
    console.log({ song });
  };
  return (
    <div className="song_row">
      <p className="index">{index + 1}</p>
      <img
        className="album_art"
        src={track?.album?.images[0]?.url}
        alt={track?.album?.name}
      />
      <div
        className={`song_rowInfo ${
          song?.track?.name === track.name && "choosen_song"
        } `}
        onClick={pickSong}
      >
        <h1>{track?.name}</h1>
        <p>
          {`${track?.artists?.map((artist) => artist.name).join(", ")} -
          ${track?.album?.name} • `}
          <small>({track?.album?.release_date})</small>
        </p>
      </div>
      <div
        className={`hidden ${song?.track?.name === track.name && "play_icon"}`}
      >
        <PauseCircleOutlineIcon />
      </div>
    </div>
  );
}

export default SongRow;
