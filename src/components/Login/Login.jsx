import React from "react";

import "./Login.css";
import VMLogo from "../../img/VolbeatsMusicLogo.png";
import { loginUrl } from "../../helpers/spotify/spotify";

function Login() {
  return (
    <div className="login">
      <img src={VMLogo} alt="spotify logo" />
      {/* Login with Spotify button */}
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
