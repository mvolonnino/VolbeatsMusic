import React from "react";

import "./SongRow.css";
import { useDataLayerValue } from "../../context/DataLayer";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { milliToMinsAndSecs } from "../../helpers/mtosecs";

function SongRow({ track, index, playSong, spotify }) {
  const [{ song, playing, myDevices }, dispatch] = useDataLayerValue();

  // const device = myDevices
  //   .map((device) => device)
  //   .filter((device) => device.is_active === true);
  // console.log({ device });

  const pickSong = () => {
    console.log(track);
    dispatch({
      type: "SET_SONG",
      song: {
        track: track,
        index: index,
      },
    });
    dispatch({
      type: "SET_RESTART",
      restart: true,
    });
    dispatch({
      type: "SET_FULL_SONG",
      fullSong: track.duration_ms,
    });
    console.log({ song });
    if (myDevices[0]?.is_active) {
      playSong(track.id);
    } else {
      spotify.play(
        {
          device_id: myDevices[0]?.id,
          uris: [track.uri],
        },
        (err, res) => {
          console.log({ err, res });
          if (err) {
            dispatch({
              type: "SET_ERROR",
              error: err.response,
            });
          }
          spotify
            .getMyCurrentPlayingTrack()
            .then((r) => {
              console.log({ r });
              dispatch({
                type: "SET_RESTART",
                restart: false,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            })
            .catch((err) => {
              dispatch({
                type: "SET_ERROR",
                error: err.response,
              });
            });
        }
      );
    }
  };

  return (
    <div
      className={`song_row ${
        song?.track?.name === track.name && "choosen_row"
      } `}
      onClick={pickSong}
    >
      {song?.track?.name === track?.name ? (
        playing ? (
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
        )
      ) : (
        <p className="index">{index + 1}</p>
      )}

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
      </div>
      <p className="song_duration">{milliToMinsAndSecs(track?.duration_ms)}</p>
    </div>
  );
}

export default SongRow;
