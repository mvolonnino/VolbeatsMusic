import React, { useEffect, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DevicesIcon from "@material-ui/icons/Devices";
import "./Devices.css";
import { useDataLayerValue } from "../../context/DataLayer";
import { Link } from "@material-ui/core";

export default function Devices({ spotify }) {
  const [{ myDevices, user }, dispatch] = useDataLayerValue();
  // console.log({ myDevices, user });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getMyDevice = useCallback(() => {
    spotify.getMyDevices().then((res) => {
      console.log({ res });
      if (res.devices?.length === 0) {
        setTimeout(() => {
          spotify.getMyDevices((err, res) => {
            console.log({ err, res });
            dispatch({
              type: "SET_MY_DEVICES",
              myDevices: res.devices?.map((device) => device),
            });
          });
          spotify.getMyCurrentPlaybackState((err, res) => {
            console.log({ res });
          });
        }, 2000);
      }
      if (res.devices?.length > 0) {
        dispatch({
          type: "SET_MY_DEVICES",
          myDevices: res.devices?.map((device) => device),
        });
      }
    });
  }, [spotify, dispatch]);

  useEffect(() => {
    // if (myDevices?.length > 0) {
    //   let deviceIds = {};
    //   deviceIds["device_ids"] = [myDevices[0]?.id];
    //   console.log({ deviceIds });
    //   spotify.transferMyPlayback(
    //     [
    //       "deviceIds",
    //       [
    //         {
    //           device_ids: [myDevices[0]?.id],
    //         },
    //       ],
    //     ],
    //     (err, res) => {
    //       if (err) {
    //         console.log({ err })
    //       }
    //     }
    //   );
    // }

    dispatch({
      type: "SET_MY_DEVICES",
      myDevices: myDevices,
    });
  }, [myDevices, dispatch, spotify]);

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
              Click Here To Open Spotify
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
