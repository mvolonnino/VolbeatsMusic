import React, { useState, useEffect } from "react";
import PlayCircleFilledTwoToneIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import SkipNextTwoToneIcon from "@material-ui/icons/SkipNextTwoTone";
import SkipPreviousTwoToneIcon from "@material-ui/icons/SkipPreviousTwoTone";
import ShuffleTwoToneIcon from "@material-ui/icons/ShuffleTwoTone";
import RepeatTwoToneIcon from "@material-ui/icons/RepeatTwoTone";
import { Grid, Slider } from "@material-ui/core";
import VolumeDownTwoToneIcon from "@material-ui/icons/VolumeDownTwoTone";
import VolumeUpTwoToneIcon from "@material-ui/icons/VolumeUpTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";
import Devices from "../Devices/Devices";
import { milliToMinsAndSecs } from "../../helpers/mtosecs";

import "./Footer.css";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer({ spotify }) {
  const [
    { song, choosenPlaylist, playing, restart, fullSong },
    dispatch,
  ] = useDataLayerValue();
  const [milliSeconds, setMilliSeconds] = useState(0);
  console.log({ milliSeconds });
  console.log({ song, choosenPlaylist, restart, fullSong });

  useEffect(() => {
    let interval = null;
    if (restart) {
      setMilliSeconds(0);
    }
    if (playing && milliSeconds < fullSong) {
      interval = setInterval(() => {
        setMilliSeconds((milliSeconds) => milliSeconds + 1000);
      }, 1000);
    } else if (!playing && milliSeconds !== 0) {
      clearInterval(interval);
    } else if (milliSeconds > fullSong) {
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
      setMilliSeconds(0);
    }
    return () => clearInterval(interval);
  }, [playing, milliSeconds, restart, dispatch, fullSong]);

  const handlePlayPause = () => {
    spotify
      .getMyCurrentPlayingTrack()
      .then((res) => {
        const { progress_ms } = res;
        console.log(progress_ms);
      })
      .catch((err) => {
        console.log({ err });
      });
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const nextSong = () => {
    let upNextSong = {};
    if (song.index < choosenPlaylist?.tracks?.items.length - 1) {
      upNextSong = Object.assign(
        ...choosenPlaylist?.tracks?.items
          .map((track) => track.track)
          .filter((track, i) => i === song.index + 1)
      );
      console.log({ upNextSong });
      dispatch({
        type: "SET_SONG",
        song: {
          track: upNextSong,
          index: song.index + 1,
        },
      });
      dispatch({
        type: "SET_RESTART",
        restart: true,
      });
      playThisSong(upNextSong);
    }
  };

  const prevSong = () => {
    let lastSong = {};
    if (song.index !== 0) {
      lastSong = Object.assign(
        ...choosenPlaylist?.tracks?.items
          .map((track) => track.track)
          .filter((track, i) => i === song.index - 1)
      );
      dispatch({
        type: "SET_SONG",
        song: {
          track: lastSong,
          index: song.index - 1,
        },
      });
      dispatch({
        type: "SET_RESTART",
        restart: true,
      });
      playThisSong(lastSong);
    }
  };

  const playThisSong = (song) => {
    console.log("SONG TO BE PLAYED", { song });
    spotify
      .play({
        uris: [song?.uri],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_FULL_SONG",
            fullSong: song.duration_ms,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
        dispatch({
          type: "SET_RESTART",
          restart: false,
        });
      });
  };

  return (
    <div className="footer">
      <div className="footer_left">
        {song && (
          <img
            className="footer_albumLogo"
            src={song?.track?.album?.images[0].url}
            alt={song?.track?.album?.name}
          />
        )}

        <div className="footer_songInfo">
          {!song && <h5 className="none">No Song Selected</h5>}
          {song?.track?.name.split(" ").length > 6 ? (
            <h5>{`${song?.track?.name.split(" ", 6).join(" ")}...`}</h5>
          ) : (
            <h5>{song?.track?.name}</h5>
          )}
          {song?.track?.artists.length > 4 ? (
            <p>{`${song?.track?.artists
              ?.map((artist) => artist.name)
              .join(", ")
              .split(",", 2)}...`}</p>
          ) : (
            <p>
              {song?.track?.artists?.map((artist) => artist.name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className="progress">
        <div className={`footer_center ${!song && "no_song"}`}>
          <ShuffleTwoToneIcon className="footer_shuffle" />
          <SkipPreviousTwoToneIcon
            className={`footer_prev ${song?.index === 0 && "no_song"}`}
            onClick={prevSong}
          />
          {playing ? (
            <PauseCircleFilledTwoToneIcon
              className="footer_play"
              fontSize="large"
              onClick={handlePlayPause}
            />
          ) : (
            <PlayCircleFilledTwoToneIcon
              className="footer_play"
              fontSize="large"
              onClick={handlePlayPause}
            />
          )}
          <SkipNextTwoToneIcon
            className={`footer_next ${
              song?.index === choosenPlaylist?.tracks?.items.length - 1 &&
              "no_song"
            }`}
            onClick={nextSong}
          />
          <RepeatTwoToneIcon className="footer_repeat" />
        </div>
        <div className="slider">
          {song ? (
            <div className="start_song">{milliToMinsAndSecs(milliSeconds)}</div>
          ) : (
            <div className="start_song">--:--</div>
          )}
          <Slider max={fullSong} value={milliSeconds} />
          {song && (
            <div className="song_length">{milliToMinsAndSecs(fullSong)}</div>
          )}
        </div>
      </div>
      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <Devices spotify={spotify} />
          </Grid>
          <Grid item>
            <VolumeDownTwoToneIcon className="footer_volDown" />
          </Grid>
          <Grid item>
            <VolumeUpTwoToneIcon className="footer_volUp" />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
