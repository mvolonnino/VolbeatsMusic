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

import "./Footer.css";
import { useDataLayerValue } from "../../context/DataLayer";

function Footer({ spotify }) {
  const [{ song }] = useDataLayerValue();

  return (
    <div className="footer">
      <div className="footer_left">
        <img
          className="footer_albumLogo"
          src={song?.track?.album?.images[0].url}
          alt={song?.track?.album?.name}
        />
        <div className="footer_songInfo">
          <h5>{song?.track?.name}</h5>
          <p>{song?.track?.artists?.map((artist) => artist.name).join(", ")}</p>
        </div>
      </div>
      <div className="footer_center">
        <ShuffleTwoToneIcon className="footer_shuffle" />
        <SkipPreviousTwoToneIcon className="footer_prev" />
        <PlayCircleFilledTwoToneIcon className="footer_play" fontSize="large" />
        <SkipNextTwoToneIcon className="footer_next" />
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
