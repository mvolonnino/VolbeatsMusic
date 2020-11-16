import React, { useEffect, useState } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TimerIcon from "@material-ui/icons/Timer";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import axios from "axios";

import "./Songs.css";
import { useDataLayerValue } from "../../context/DataLayer";
import SongRow from "../SongRow/SongRow";

function Songs({ spotify, parentPosition }) {
  const [{ choosenPlaylist, song, token }, dispatch] = useDataLayerValue();
  const [likedArray, setLikedArray] = useState([]);
  const [stickyTable, setStickyTable] = useState(false);

  async function checkLikedSong(songIds) {
    if (choosenPlaylist) {
      try {
        await axios
          .get("https://api.spotify.com/v1/me/tracks/contains", {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              ids: songIds,
            },
          })
          .then((res) => {
            setLikedArray(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  const setShuffleSong = () => {
    var songs = choosenPlaylist?.tracks?.items?.map((item) => item);
    var songIndex = Math.floor(Math.random() * songs?.length);
    dispatch({
      type: "SET_SONG",
      song: {
        track: songs[songIndex].track,
        index: songIndex,
      },
    });
    dispatch({
      type: "SET_RESTART",
      restart: true,
    });
    playSong(songs[songIndex].track.id);
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          console.log({ r });
          if (r.is_playing) {
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
            dispatch({
              type: "SET_RESTART",
              restart: false,
            });
          }
        });
      })
      .catch((err) => {
        console.log({ err });
        if (err?.status === 404) {
          const message = `No Active Devices Found - Open up Spotify App & Refresh Page`;
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message,
              open: true,
              alert: "red",
            },
          });
          dispatch({
            type: "SET_MY_DEVICES",
            myDevices: [],
          });
        } else if (err?.status === 429) {
          const message = `API Rate Limit Hit - Try Again In A Few Seconds`;
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message,
              open: true,
              alert: "red",
            },
          });
          dispatch({
            type: "SET_SONG",
            song: null,
          });
        } else if (err?.status === 401) {
          const message = `Authentication Token Expired - Refresh or Re Login`;
          dispatch({
            type: "SET_ALERT_MESSAGE",
            alertMessage: {
              message,
              open: true,
              alert: "red",
            },
          });
        }
      });
  };

  useEffect(() => {
    if (parentPosition > 410) {
      if (!stickyTable) {
        setStickyTable(true);
      }
    } else if (parentPosition <= 410) {
      if (stickyTable) {
        setStickyTable(false);
      }
    }
  }, [parentPosition]);

  useEffect(() => {
    if (choosenPlaylist?.runCheckedSongs) {
      setLikedArray([]);
      var songIds = choosenPlaylist?.tracks?.items
        .map((item) => item.track.uri.split(":")[2])
        .join(",");
      checkLikedSong(songIds);
    }

    dispatch({
      type: "SET_CHOOSEN_PLAYLIST",
      choosenPlaylist: choosenPlaylist,
    });
    dispatch({
      type: "SET_SHUFFLE_SONG",
      setShuffleSong: setShuffleSong,
    });
    dispatch({
      type: "SET_PLAY_SONG",
      playSong: playSong,
    });
  }, [dispatch, choosenPlaylist]);

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
      <div className={`${stickyTable ? "sticky_table" : "table"}`}>
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
      {likedArray.length > 0 &&
        choosenPlaylist?.tracks?.items.map((item, i) => {
          return (
            <SongRow
              track={item.track}
              index={i}
              likedSong={likedArray.filter(
                (likedSong, index) =>
                  (index === i && likedSong) || (index === i && !likedSong)
              )}
              key={i}
              spotify={spotify}
              playSong={playSong}
            />
          );
        })}
    </div>
  );
}

export default Songs;
