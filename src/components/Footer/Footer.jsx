import React from "react";

import "./Footer.css";
import PlayCircleFilledTwoToneIcon from "@material-ui/icons/PlayCircleFilledTwoTone";
import SkipNextTwoToneIcon from "@material-ui/icons/SkipNextTwoTone";
import SkipPreviousTwoToneIcon from "@material-ui/icons/SkipPreviousTwoTone";
import ShuffleTwoToneIcon from "@material-ui/icons/ShuffleTwoTone";
import RepeatTwoToneIcon from "@material-ui/icons/RepeatTwoTone";
import { Grid, Slider } from "@material-ui/core";
import QueueMusicTwoToneIcon from "@material-ui/icons/QueueMusicTwoTone";
import VolumeDownTwoToneIcon from "@material-ui/icons/VolumeDownTwoTone";
import VolumeUpTwoToneIcon from "@material-ui/icons/VolumeUpTwoTone";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_left">
        <img
          className="footer_albumLogo"
          src="https://vignette.wikia.nocookie.net/usher-raymond/images/d/d1/Confessionsalbum.jpg/revision/latest/scale-to-width-down/340?cb=20141021062312"
          alt=""
        />
        <div className="footer_songInfo">
          <h4>Yeah!</h4>
          <p>Usher</p>
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
            <QueueMusicTwoToneIcon />
          </Grid>
          <Grid item>
            <VolumeDownTwoToneIcon />
          </Grid>
          <Grid item>
            <VolumeUpTwoToneIcon />
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
