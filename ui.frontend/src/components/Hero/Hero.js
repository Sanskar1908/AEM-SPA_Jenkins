import React from "react";
import { MapTo } from "@adobe/aem-react-editable-components";

require("./Hero.scss");

// 1. Define the EditConfig (This fixes the HeroEditConfig error)
const HeroEditConfig = {
  emptyLabel: "RDR2 Hero: Configure Image/Video and Text",
  isEmpty: props => !props.imagePath && !props.videoPath && !props.title,
};

const Hero = props => {
  // 2. Destructure the props (This fixes the 'not defined' errors)
  const title = props.title;
  const subtitle = props.subtitle;
  const imagePath = props.imagePath;
  const videoPath = props.videoPath;

  return (
    <div className="rdr-hero">
      <div className="rdr-hero__background">
        {videoPath ? (
          <video autoPlay muted loop playsInline className="rdr-hero__video">
            <source src={videoPath} type="video/mp4" />
          </video>
        ) : (
          <div
            className="rdr-hero__image"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
        )}
        <div className="rdr-hero__overlay" />
      </div>

      <div className="rdr-hero__content">
        {subtitle && <h2 className="rdr-hero__subtitle">{subtitle}</h2>}
        {title && <h1 className="rdr-hero__title">{title}</h1>}
      </div>
    </div>
  );
};

// 3. Ensure the export uses the config
export default MapTo("wknd-spa-react/components/hero")(Hero, HeroEditConfig);
