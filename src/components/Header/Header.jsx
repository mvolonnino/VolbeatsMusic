import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";
import { useDataLayerValue } from "../../context/DataLayer";
import Dropdown from "../Dropdown/Dropdown";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

function Header({ parentPosition }) {
  const [{ user, choosenPlaylist, setShuffleSong }] = useDataLayerValue();
  const [showHeader, setShowHeader] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);

  useEffect(() => {
    console.log("HEADER TOP", { parentPosition });
    if (parentPosition > 80) {
      if (!hideSearch) {
        setHideSearch(true);
      }
    } else if (parentPosition <= 80) {
      if (hideSearch) {
        setHideSearch(false);
      }
    }
    if (parentPosition > 280) {
      if (!showHeader) {
        setShowHeader(true);
      }
    } else if (parentPosition <= 280) {
      if (showHeader) {
        setShowHeader(false);
      }
    }
  }, [parentPosition]);

  return (
    <div className={`header ${showHeader ? "showHeader" : ""}`}>
      <div
        className={`${
          showHeader || hideSearch ? "header_change" : "header_left"
        }`}
      >
        {showHeader ? (
          <>
            <div className="header_play">
              <PlayCircleFilledIcon
                className="play_btn"
                onClick={setShuffleSong}
              />
            </div>
            <div className="header_playlist">
              <h4 className="playlist_name">{choosenPlaylist?.name}</h4>
            </div>
          </>
        ) : (
          <>
            {!hideSearch && (
              <>
                <SearchIcon />
                <input
                  placeholder="Search for Songs, Artists, Albums..."
                  type="text"
                />
              </>
            )}
          </>
        )}
      </div>
      <div className="header_right">
        <div className="avatar">
          <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        </div>
        <Dropdown />
      </div>
    </div>
  );
}

export default Header;
