import React, { useState } from "react";

import "./Login.css";
import VMLogo from "../../img/VolbeatsMusicLogo.png";
import { loginUrl } from "../../helpers/spotify/spotify";

function Login() {
  const [showClone, setShowClone] = useState(false);
  const showCloneDiv = () => {
    setShowClone(!showClone);
  };
  return (
    <div className="login">
      <img src={VMLogo} alt="spotify logo" onClick={showCloneDiv} />
      {showClone ? <p>A Spotify Clone :)</p> : null}
      {/* Login with Spotify button */}
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
