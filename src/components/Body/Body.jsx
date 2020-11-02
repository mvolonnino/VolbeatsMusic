import React from "react";

import "./Body.css";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Songs from "../Songs/Songs";

function Body({ spotify }) {
  return (
    <div className="body">
      {/* Header  */}
      <Header spotify={spotify} />

      {/* Banner */}
      <Banner spotify={spotify} />
      {/* Songs */}
      <Songs spotify={spotify} />
    </div>
  );
}

export default Body;
