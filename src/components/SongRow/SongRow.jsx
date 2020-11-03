import React from "react";

import "./SongRow.css";
import { useDataLayerValue } from "../../context/DataLayer";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import millitoMinsAndSec, { milliToMinsAndSecs } from "../../helpers/mtosecs";

function SongRow({ track, index, playSong, spotify }) {
  const [{ song, playing, myDevices }, dispatch] = useDataLayerValue();

  const device = myDevices
    .map((device) => device)
    .filter(
      (device) =>
        device.name === "Web Player (Chrome)" || device.name === "MacBook Pro"
    );

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
    if (device.is_active) {
      playSong(track.id);
    } else {
      spotify
        .play({
          device_id: device[0]?.id,
          uris: [track.uri],
        })
        .then((res) => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            console.log({ r });
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
          });
        });
    }
  };

  return (
    <div className="song_row" onClick={pickSong}>
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
      >
        <h1>{track?.name}</h1>
        <p>
          {`${track?.artists?.map((artist) => artist.name).join(", ")} -
          ${track?.album?.name} • `}
          <small>({track?.album?.release_date})</small>
        </p>
        <p className="song_duration">
          {milliToMinsAndSecs(track?.duration_ms)}
        </p>
      </div>
      {playing ? (
        <div
          className={`hidden ${
            song?.track?.name === track.name && "play_icon"
          }`}
        >
          <PauseCircleOutlineIcon />
        </div>
      ) : (
        <div
          className={`hidden ${
            song?.track?.name === track.name && "play_icon"
          }`}
        >
          <PlayCircleOutlineIcon />
        </div>
      )}
    </div>
  );
}

export default SongRow;
