import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TimerIcon from "@material-ui/icons/Timer";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

import "./Songs.css";
import { useDataLayerValue } from "../../context/DataLayer";
import SongRow from "../SongRow/SongRow";

function Songs({ spotify }) {
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
    playSong(songs[songIndex].track.id);
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
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
      <div className="table">
        <small className="hash">
          <FormatListNumberedIcon />
        </small>
        <p className="title">TITLE</p>
        <small className="duration">
          <TimerIcon />
        </small>
      </div>
      <hr />
      {/* List of songs */}
      {choosenPlaylist?.tracks.items.map((item, i) => (
        <SongRow
          track={item.track}
          index={i}
          key={i}
          spotify={spotify}
          playSong={playSong}
        />
      ))}
    </div>
  );
}

export default Songs;
