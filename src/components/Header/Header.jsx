import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";
import { useDataLayerValue } from "../../context/DataLayer";
import Dropdown from "../Dropdown/Dropdown";

function Header() {
  const [{ user }] = useDataLayerValue();

  return (
    <div className="header">
      <div className="header_left">
        <SearchIcon />
        <input placeholder="Search for Songs, Artists, Albums..." type="text" />
      </div>
      <div className="header_right">
        <Avatar src={user?.images[0].url} alt={user?.display_name} />
        <Dropdown />
      </div>
    </div>
  );
}

export default Header;
