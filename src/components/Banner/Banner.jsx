import React from "react";
import ArrowForwardIosTwoToneIcon from "@material-ui/icons/ArrowForwardIosTwoTone";
import ArrowBackIosTwoToneIcon from "@material-ui/icons/ArrowBackIosTwoTone";

import "./Banner.css";
import { useDataLayerValue } from "../../context/DataLayer";

function Banner({ spotify }) {
  const [
    { choosenPlaylist, token, offset, limit, userTracks },
    dispatch,
  ] = useDataLayerValue();

  const getNext50Songs = () => {
    spotify.setAccessToken(token);

    spotify
      .getMySavedTracks({ offset: offset, limit: limit })
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
        dispatch({
          type: "SET_CHOOSEN_PLAYLIST",
          choosenPlaylist: userTracks,
        });
      })
      .catch((err) => {
        console.log({ err });
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
        dispatch({
          type: "SET_CHOOSEN_PLAYLIST",
          choosenPlaylist: userTracks,
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

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
            <p>{choosenPlaylist?.description}</p>
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
          <div className="banner_text">
            <h2>YOUR LIBRARY</h2>
            <p>Below is 50 of your saved songs</p>
            <p>{`${choosenPlaylist?.tracks?.total} songs`}</p>
            <div className="arrow_icons">
              <div className="last50">
                <ArrowBackIosTwoToneIcon onClick={getLast50Songs} />
              </div>
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
