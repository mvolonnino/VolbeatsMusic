import React from "react";

import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DevicesIcon from "@material-ui/icons/Devices";
import "./Devices.css";
import { useDataLayerValue } from "../../context/DataLayer";
import { Link } from "@material-ui/core";

export default function Devices() {
  const [{ myDevices, user }] = useDataLayerValue();
  console.log({ myDevices, user });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="devices"
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <DevicesIcon className="footer_devices" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {myDevices?.map((device) => (
          <MenuItem key={device?.id}>{device?.name}</MenuItem>
        ))}
        <MenuItem>
          <Link
            href={user?.external_urls?.spotify}
            target="_blank"
            rel="noreferrer"
            variant="body2"
          >
            Click Here If No Active Devices
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
