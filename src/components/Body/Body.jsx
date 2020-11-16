import React from "react";

import "./Body.css";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Songs from "../Songs/Songs";
import useScrollTop from "../../helpers/Scroll";

function Body({ spotify }) {
  const [ref, top] = useScrollTop();

  return (
    <div className="body" ref={ref}>
      {/* Header  */}
      <Header spotify={spotify} parentPosition={top} />
      {/* Banner */}
      <Banner spotify={spotify} />
      {/* Songs */}
      <Songs spotify={spotify} parentPosition={top} />
    </div>
  );
}

export default Body;
