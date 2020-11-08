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
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";

import "./Footer.css";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer({ spotify }) {
  const [
    {
      song,
      choosenPlaylist,
      playing,
      restart,
      fullSong,
      volumeLvl,
      myDevices,
      shuffleState,
      setShuffleSong,
    },
    dispatch,
  ] = useDataLayerValue();
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [volume, setVolume] = useState(volumeLvl);
  const [repeat, setRepeat] = useState(0);

  useEffect(() => {
    setVolume(volumeLvl);
    let interval = null;
    if (restart) {
      setMilliSeconds(0);
    }
    if (
      (playing && milliSeconds < fullSong) ||
      (playing && repeat && milliSeconds < fullSong)
    ) {
      interval = setInterval(() => {
        setMilliSeconds((milliSeconds) => milliSeconds + 1000);
      }, 1000);
    } else if (!playing && milliSeconds !== 0) {
      clearInterval(interval);
    } else if (milliSeconds >= fullSong && repeat === 0) {
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
      setMilliSeconds(0);
    } else if (milliSeconds >= fullSong && repeat === 1) {
      setMilliSeconds(0);
      nextSong();
    } else if (milliSeconds >= fullSong && repeat === 2) {
      setMilliSeconds(0);
    }
    return () => clearInterval(interval);
  }, [playing, milliSeconds, restart, dispatch, fullSong, volumeLvl, repeat]);

  const handlePlayPause = () => {
    spotify
      .getMyCurrentPlayingTrack()
      .then((res) => {
        console.log("HANDLE PLAYPAUSE", { res });
        if (res.is_playing) {
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
      })
      .catch((err) => {
        console.log({ err });
        dispatch({
          type: "SET_ERROR",
          error: err.response,
        });
      });
  };

  const nextSong = () => {
    if (shuffleState) {
      setShuffleSong();
    } else {
      let upNextSong = {};
      if (song) {
        if (
          song?.index < choosenPlaylist?.tracks?.items.length - 1 &&
          !shuffleState
        ) {
          upNextSong = Object.assign(
            ...choosenPlaylist?.tracks?.items
              .map((track) => track.track)
              .filter((track, i) => i === song.index + 1)
          );
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
      }
    }
  };

  const prevSong = () => {
    let lastSong = {};
    if (song) {
      if (song?.index !== 0) {
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

  const SetVolumeLvl = (event, newValue) => {
    switch (event) {
      case "up":
        if (volumeLvl <= 75) {
          newValue = parseInt(volumeLvl + 25);
        } else {
          newValue = 100;
        }
        break;
      case "down":
        if (volumeLvl >= 25) {
          newValue = parseInt(volumeLvl - 25);
        } else {
          newValue = 0;
        }
        break;
      default:
        break;
    }

    spotify
      .setVolume(newValue)
      .then(() => {
        dispatch({
          type: "SET_VOLUME_LEVEL",
          volumeLvl: newValue,
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleSeek = (event, value) => {
    let valueToSeek;
    if (song && playing) {
      if (event) {
        setMilliSeconds(value);
        valueToSeek = value;
      }
      spotify.seek(valueToSeek, (err, res) => {});
    }
  };

  const handleRepeat = () => {
    if (repeat === 0) {
      setRepeat(1);
      console.log("NEXT SONG ON");
    } else if (repeat === 1) {
      setRepeat(2);
    } else {
      setRepeat(0);
    }
  };

  const handleShuffleState = () => {
    dispatch({
      type: "SET_SHUFFLE_STATE",
      shuffleState: !shuffleState,
    });
  };

  useEffect(() => {
    console.log("SHUFFLE state", { shuffleState });
    dispatch({
      type: "SET_HANDLE_PLAY_PAUSE",
      handlePlayPause: handlePlayPause,
    });
    if (myDevices) {
      if (repeat === 2) {
        spotify.setRepeat(
          "track",
          { device_id: myDevices[0].id },
          (err, res) => {
            console.log("REPEAT ON", { err, res });
          }
        );
      } else if (repeat === 0) {
        spotify.setRepeat("off", { device_id: myDevices[0].id }, (err, res) => {
          console.log("REPEAT OFF", { err, res });
        });
      }
    }
  }, [repeat, spotify, myDevices, dispatch, shuffleState]);

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
          {song?.track?.name.split(" ").length > 10 ? (
            <h5>{`${song?.track?.name.split(" ", 10).join(" ")}...`}</h5>
          ) : (
            <h5>{song?.track?.name}</h5>
          )}
          {song?.track?.artists.length > 6 ? (
            <p>{`${song?.track?.artists
              ?.map((artist) => artist.name)
              .join(", ")
              .split(",", 5)}...`}</p>
          ) : (
            <p>
              {song?.track?.artists?.map((artist) => artist.name).join(", ")}
            </p>
          )}
        </div>
      </div>
      <div className="progress">
        <div className={`footer_center ${!song && "no_song"}`}>
          <ShuffleTwoToneIcon
            className={`footer_shuffle ${shuffleState && "shuffle_on"}`}
            onClick={handleShuffleState}
          />
          <SkipPreviousTwoToneIcon
            className={`footer_prev ${song?.index === 0 && "no_song"}`}
            onClick={prevSong}
          />
          {playing ? (
            <PauseCircleFilledTwoToneIcon
              className="footer_play"
              fontSize="large"
              onClick={song && handlePlayPause}
            />
          ) : (
            <PlayCircleFilledTwoToneIcon
              className="footer_play"
              fontSize="large"
              onClick={song && handlePlayPause}
            />
          )}
          <SkipNextTwoToneIcon
            className={`footer_next ${
              song?.index === choosenPlaylist?.tracks?.items.length - 1 &&
              !shuffleState &&
              "no_song"
            }`}
            onClick={nextSong}
          />
          {repeat === 0 && (
            <RepeatTwoToneIcon
              className={`footer_repeat`}
              onClick={handleRepeat}
            />
          )}
          {repeat === 1 && (
            <RepeatTwoToneIcon
              className={`footer_repeat ${repeat && "repeat_true"}`}
              onClick={handleRepeat}
            />
          )}
          {repeat === 2 && (
            <RepeatOneIcon
              className={`footer_repeat ${repeat && "repeat_true"}`}
              onClick={handleRepeat}
            />
          )}
        </div>
        <div className="slider">
          {song ? (
            <div className="start_song">{milliToMinsAndSecs(milliSeconds)}</div>
          ) : (
            <div className="start_song">--:--</div>
          )}
          <Slider
            max={fullSong - 1000}
            value={milliSeconds}
            onChange={handleSeek}
            step={1000}
          />
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
            {volumeLvl === 0 ? (
              <VolumeOffIcon className="footer_volDown" />
            ) : (
              <VolumeDownTwoToneIcon
                className="footer_volDown"
                onClick={() => SetVolumeLvl("down")}
              />
            )}
          </Grid>
          <Grid item xs>
            <Slider
              aria-labelledby="continuous-slider"
              value={volume || 0}
              onChange={SetVolumeLvl}
              step={10}
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <VolumeUpTwoToneIcon
              className={`footer_volUp ${volumeLvl === 0 && "no_volume"}`}
              onClick={() => SetVolumeLvl("up")}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
