import React from "react";

import "./SongRow.css";

function SongRow({ track, index }) {
  return (
    <div className="song_row">
      <p className="index">{index + 1}</p>
      <img
        className="album_art"
        src={track.album.images[0].url}
        alt={track.album.name}
      />
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
