import React, { useEffect } from "react";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import ArrowBackIosTwoToneIcon from "@material-ui/icons/ArrowBackIosTwoTone";

import "./Banner.css";
import yourMusic from "../../img/yourMusic.png";
import { useDataLayerValue } from "../../context/DataLayer";

function Banner({ spotify }) {
  const [
    { choosenPlaylist, offset, limit, userTracks },
    dispatch,
  ] = useDataLayerValue();

  const getNext50Songs = () => {
    spotify
      .getMySavedTracks({ offset: offset + limit, limit: limit })
      .then((tracks) => {
        dispatch({
          type: "SET_OFFSET",
          offset: offset + limit,
        });
        dispatch({
          type: "SET_USER_TRACKS",
          userTracks: {
            tracks: tracks,
          },
        });
      })
      .catch((err) => {
        console.log({ err });
        dispatch({
          type: "SET_ALERT_MESSAGE",
          alertMessage: {
            message: `Error Fetching User's Next 50 Songs - Try Again`,
            open: true,
          },
        });
      });
  };

  const getLast50Songs = () => {
    spotify
      .getMySavedTracks({ offset: offset - limit, limit: limit })
      .then((tracks) => {
        dispatch({
          type: "SET_OFFSET",
          offset: offset - limit,
        });
        dispatch({
          type: "SET_USER_TRACKS",
          userTracks: {
            tracks: tracks,
          },
        });
      })
      .catch((err) => {
        console.log({ err });
        dispatch({
          type: "SET_ALERT_MESSAGE",
          alertMessage: {
            message: `Error Fetching User's Previous 50 Songs - Try Again`,
            open: true,
          },
        });
      });
  };

  useEffect(() => {
    dispatch({
      type: "SET_CHOOSEN_PLAYLIST",
      choosenPlaylist: userTracks,
    });
  }, [userTracks, dispatch, choosenPlaylist]);

  return (
    <div className="banner">
      {choosenPlaylist?.images ? (
        <>
          <img
            src={choosenPlaylist?.images[0]?.url}
            alt={choosenPlaylist?.name}
          />
          <div className="banner_text">
            <strong>PLAYLIST</strong>
            <h2>{choosenPlaylist?.name}</h2>
            <p>{choosenPlaylist?.description?.split(":")[0]}</p>
            <div className="banner_small">
              <strong>{choosenPlaylist?.owner?.display_name}</strong>
              <small>
                {` • ${choosenPlaylist?.followers?.total} like • ${choosenPlaylist?.tracks?.total} songs`}
              </small>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={yourMusic} alt="Music Logo" />
          <div className="banner_text">
            <strong>{`Showing ${offset} - ${offset + limit} out of ${
              choosenPlaylist?.tracks?.total
            } songs`}</strong>
            <h2>YOUR LIBRARY</h2>
            <div className="arrow_icons">
              {offset > 0 ? (
                <div className="last50">
                  <ArrowBackIosTwoToneIcon onClick={getLast50Songs} />
                </div>
              ) : (
                <div className="beginning">
                  <ArrowBackIosTwoToneIcon />
                </div>
              )}
              <div className="next50">
                <ArrowForwardIosTwoToneIcon onClick={getNext50Songs} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;
