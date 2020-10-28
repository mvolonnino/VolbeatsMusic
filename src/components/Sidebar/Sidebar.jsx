import React from "react";
import { useDataLayerValue } from "../../context/DataLayer";

import "./Sidebar.css";
import VMSidebarLogo from "../../img/VMSidebarLogo.png";
import SidebarOption from "../SidebarOption/SidebarOption";
// material ui icons
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import LibraryMusicTwoToneIcon from "@material-ui/icons/LibraryMusicTwoTone";

function Sidebar() {
  const [{ playlists }, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img className="sidebar_logo" src={VMSidebarLogo} alt="Volbeats Music" />

      {/* SidebarOptions */}
      <SidebarOption title="Home" Icon={HomeTwoToneIcon} />
      <SidebarOption title="Search" Icon={SearchTwoToneIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicTwoToneIcon} />
      <br />
      <strong className="playlists">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption title={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
