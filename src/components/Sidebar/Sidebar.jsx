import React from "react";
import { useDataLayerValue } from "../../context/DataLayer";

import "./Sidebar.css";
import VMSidebarLogo from "../../img/VMSidebarLogo.png";
import SidebarOption from "../SidebarOption/SidebarOption";
// material ui icons
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";
import LibraryMusicTwoToneIcon from "@material-ui/icons/LibraryMusicTwoTone";

function Sidebar({ spotify }) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img className="sidebar_logo" src={VMSidebarLogo} alt="Volbeats Music" />

      {/* SidebarOptions */}
      <SidebarOption title="Home" Icon={HomeTwoToneIcon} spotify={spotify} />
      <SidebarOption
        title="Search"
        Icon={SearchTwoToneIcon}
        spotify={spotify}
      />
      <SidebarOption
        title="Your Library"
        Icon={LibraryMusicTwoToneIcon}
        spotify={spotify}
      />
      <br />
      <strong className="playlists">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist, i) => (
        <SidebarOption
          spotify={spotify}
          uri={playlist.uri}
          title={playlist.name}
          key={i}
        />
      ))}
    </div>
  );
}

export default Sidebar;
