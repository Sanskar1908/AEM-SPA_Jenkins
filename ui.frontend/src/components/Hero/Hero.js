import React from "react";
import { MapTo } from "@adobe/aem-react-editable-components";
require("./Hero.scss");
const HeroEditCofig = {
  emptyLabel: "RDR2 Hero: Configure Image/Video and Text",
  isEmpty: props => !props.imagePath && !props.videoPath && !props.title,
};
const Hero = props => {
  return (
    <div className="rdr-hero">
      {/* Background Layer */}
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
        {/* Red Vignette Overlay for RDR2 Vibe */}
        <div className="rdr-hero__overlay" />
      </div>

      {/* Content Layer (Bottom Left) */}
      <div className="rdr-hero__content">
        {subtitle && <h2 className="rdr-hero__subtitle">{subtitle}</h2>}
        {title && <h1 className="rdr-hero__title">{title}</h1>}
      </div>
    </div>
  );
};
export default MapTo("rdr-spa/components/hero")(Hero, HeroEditConfig);
