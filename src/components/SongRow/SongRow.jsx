import React, { useState } from "react";

import "./SongRow.css";
import { useDataLayerValue } from "../../context/DataLayer";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { milliToMinsAndSecs } from "../../helpers/mtosecs";

function SongRow({ track, index, playSong, spotify, likedSong }) {
  const [{ song, playing, handlePlayPause }, dispatch] = useDataLayerValue();
  const [liked, setLiked] = useState(likedSong[0]);

  const pickSong = () => {
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
    playSong(track.id);
  };

  const handleLikeUnlike = () => {
    const trackId = track.uri.split(":")[2];
    if (!liked) {
      spotify.addToMySavedTracks({ ids: [trackId] }, (err, res) => {
        console.log("LIKED SONG", { err, res });
        if (!err) {
          setLiked(true);
          const message = `${track.name} added to your liked songs`;
          console.log({ message });
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message,
              open: true,
            },
          });
        }
      });
    } else if (liked) {
      spotify.removeFromMySavedTracks({ ids: [trackId] }, (err, res) => {
        if (!err) {
          setLiked(false);
          const message = `${track.name} removed from your liked songs`;
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message,
              open: true,
            },
          });
        }
      });
    }
  };

  return (
    <div
      className={`song_row ${
        song?.track?.name === track.name && "choosen_row"
      } `}
    >
      {song?.track?.name === track?.name ? (
        playing ? (
          <div
            className={`hidden ${
              song?.track?.name === track.name && "play_icon"
            }`}
          >
            <PauseCircleOutlineIcon
              className="play_pause_icon"
              onClick={handlePlayPause}
            />
          </div>
        ) : (
          <div
            className={`hidden ${
              song?.track?.name === track.name && "play_icon"
            }`}
          >
            <PlayCircleOutlineIcon
              className="play_pause_icon"
              onClick={handlePlayPause}
            />
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
        onClick={pickSong}
      >
        <h1>{track?.name}</h1>
        <p>
          {`${track?.artists?.map((artist) => artist.name).join(", ")} -
          ${track?.album?.name} • `}
          <small>({track?.album?.release_date})</small>
        </p>
      </div>
      <div className="song_features">
        {liked ? (
          <FavoriteIcon className="heart_song" onClick={handleLikeUnlike} />
        ) : (
          <FavoriteBorderIcon
            className={`heart_song ${!liked && "not_liked"}`}
            onClick={handleLikeUnlike}
          />
        )}

        <p className="song_duration">
          {milliToMinsAndSecs(track?.duration_ms)}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
