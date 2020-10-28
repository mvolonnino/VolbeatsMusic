import React from "react";

import "./Banner.css";
import { useDataLayerValue } from "../../context/DataLayer";

function Banner() {
  const [{ discover_weekly }] = useDataLayerValue();
  return (
    <div className="banner">
      <img src={discover_weekly?.images[0]?.url} alt={discover_weekly?.name} />
      <div className="banner_text">
        <strong>PLAYLIST</strong>
        <h2>{discover_weekly?.name}</h2>
        <p>{discover_weekly?.description}</p>
        <div className="banner_small">
          <strong>{discover_weekly?.owner?.display_name}</strong>
          <small>
            {` • ${discover_weekly?.followers?.total} like • ${discover_weekly?.tracks?.total} songs`}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Banner;
