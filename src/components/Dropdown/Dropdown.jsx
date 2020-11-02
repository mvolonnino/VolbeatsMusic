import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDataLayerValue } from "../../context/DataLayer";
import "./Dropdown.css";

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [{ user }, dispatch] = useDataLayerValue();
  const options = {
    User: user?.display_name,
    UserID: user?.id,
    Followers: user?.followers.total,
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dropdown">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className="vert_button" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {user && (
          <MenuItem>
            <a
              className="link"
              href={user?.external_urls?.spotify}
              target="_blank"
              rel="noreferrer"
            >
              Spotify Profile
            </a>
          </MenuItem>
        )}

        {Object.entries(options).map((key, i) => (
          <MenuItem key={i} onClick={handleClose}>
            {`${key[0]}: ${key[1]}`}
          </MenuItem>
        ))}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
