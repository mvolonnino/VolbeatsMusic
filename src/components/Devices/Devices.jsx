import React, { useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DevicesIcon from "@material-ui/icons/Devices";
import "./Devices.css";
import { useDataLayerValue } from "../../context/DataLayer";
import { Link } from "@material-ui/core";

export default function Devices({ spotify }) {
  const [{ myDevices, user }, dispatch] = useDataLayerValue();
  console.log({ myDevices, user });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getMyDevice = () => {
    setTimeout(() => {
      spotify.getMyDevices((err, res) => {
        if (err) throw err;
        console.log(res);
        dispatch({
          type: "SET_MY_DEVICES",
          myDevices: res.devices.map((device) => device),
        });
      });
    }, 500);
  };

  useEffect(() => {
    dispatch({
      type: "SET_MY_DEVICES",
      myDevices: myDevices,
    });
  }, [myDevices, dispatch]);

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
          <MenuItem key={device.id}>{device?.name}</MenuItem>
        ))}
        {myDevices?.length === 0 && (
          <MenuItem onClick={getMyDevice}>
            <Link
              href={user?.external_urls?.spotify}
              target="_blank"
              rel="noreferrer"
              variant="body2"
              onClick={handleClose}
            >
              Click Here To Open Spotify And Then Refreash This App To Get
              Active Player
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
