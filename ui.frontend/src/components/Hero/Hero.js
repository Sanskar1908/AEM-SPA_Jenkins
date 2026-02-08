import React, { useState, useRef } from "react";
import { MapTo } from "@adobe/aem-react-editable-components";

require("./Hero.scss");

const HeroEditConfig = {
  emptyLabel: "RDR2 Hero: Configure Image/Video and Text",
  isEmpty: props => !props.imagePath && !props.videoPath && !props.title,
};

const Hero = props => {
  const { title, subtitle, imagePath, videoPath } = props;

  // State to manage mute/unmute
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      console.log(videoRef.current);
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="rdr-hero">
      <div className="rdr-hero__background">
        {videoPath ? (
          <div className="rdr-hero__video-wrapper">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted // Keep muted initially so it autoplays
              playsInline
              className="rdr-hero__video"
            >
              <source src={videoPath} type="video/mp4" />
            </video>

            {/* Audio Toggle Button */}
            <button className="rdr-hero__audio-toggle" onClick={toggleMute}>
              {isMuted ? "MUTE" : "UNMUSTE"}
            </button>
          </div>
        ) : (
          <div
            className="rdr-hero__image"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
        )}
      </div>

      <div className="rdr-hero__content">
        {title && <h1 className="rdr-hero__title">{title}</h1>}
        {subtitle && <h2 className="rdr-hero__subtitle">{subtitle}</h2>}
      </div>
    </div>
  );
};

export default MapTo("wknd-spa-react/components/hero")(Hero, HeroEditConfig);
