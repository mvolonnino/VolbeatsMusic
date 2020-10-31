import React from "react";
import PlayCircleFilledTwoToneIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import SkipNextTwoToneIcon from "@material-ui/icons/SkipNextTwoTone";
import SkipPreviousTwoToneIcon from "@material-ui/icons/SkipPreviousTwoTone";
import ShuffleTwoToneIcon from "@material-ui/icons/ShuffleTwoTone";
import RepeatTwoToneIcon from "@material-ui/icons/RepeatTwoTone";
import { Grid, Slider } from "@material-ui/core";
import QueueMusicTwoToneIcon from "@material-ui/icons/QueueMusicTwoTone";
import VolumeDownTwoToneIcon from "@material-ui/icons/VolumeDownTwoTone";
import VolumeUpTwoToneIcon from "@material-ui/icons/VolumeUpTwoTone";
import PauseCircleFilledTwoToneIcon from "@material-ui/icons/PauseCircleFilledTwoTone";

import "./Footer.css";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer({ spotify }) {
  const [{ song, choosenPlaylist }, dispatch] = useDataLayerValue();

  const nextSong = () => {
    if (song.index < choosenPlaylist?.tracks?.items.length - 1) {
      dispatch({
        type: "SET_SONG",
        song: {
          track: Object.assign(
            ...choosenPlaylist?.tracks?.items
              .map((track) => track.track)
              .filter((track, i) => i === song.index + 1)
          ),
          index: song.index + 1,
        },
      });
    }
  };

  const prevSong = () => {
    if (song.index !== 0) {
      dispatch({
        type: "SET_SONG",
        song: {
          track: Object.assign(
            ...choosenPlaylist?.tracks?.items
              .map((track) => track.track)
              .filter((track, i) => i === song.index - 1)
          ),
          index: song.index - 1,
        },
      });
    }
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
          <h5>{song?.track?.name}</h5>
          <p>{song?.track?.artists?.map((artist) => artist.name).join(", ")}</p>
        </div>
      </div>
      <div className={`footer_center ${!song && "no_song"}`}>
        <ShuffleTwoToneIcon className="footer_shuffle" />
        <SkipPreviousTwoToneIcon
          className={`footer_prev ${song?.index === 0 && "no_song"}`}
          onClick={prevSong}
        />
        {song ? (
          <PauseCircleFilledTwoToneIcon
            className="footer_play"
            fontSize="large"
          />
        ) : (
          <PlayCircleFilledTwoToneIcon
            className="footer_play"
            fontSize="large"
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
      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <QueueMusicTwoToneIcon className="footer_queue" />
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
