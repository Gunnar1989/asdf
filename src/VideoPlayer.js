import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export default function VideoPlayer({ url }) {
  console.log("URL: " + url);
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        height="100%"
      />
    </div>
  );
}
