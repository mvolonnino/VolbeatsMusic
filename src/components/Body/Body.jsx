import React from "react";

import "./Body.css";
import Header from "../Header/Header";

function Body({ spotify }) {
  return (
    <div className="body">
      {/* Header  */}
      <Header spotify={spotify} />
    </div>
  );
}

export default Body;
