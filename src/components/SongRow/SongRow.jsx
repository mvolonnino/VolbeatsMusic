import React from "react";

import "./SongRow.css";

function SongRow({ track }) {
  return (
    <div className="song_row">
      <img src={track.album.images[2].url} alt={track.album.name} />
      <div className="song_rowInfo">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
