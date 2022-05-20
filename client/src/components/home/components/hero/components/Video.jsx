import React from "react";
import VideoDialog from "../../../../dialog/video/Index";
import PropTypes from "prop-types";

const HomeHeroVideo = ({ open, setOpen }) => {
  return (
    <VideoDialog
      open={open}
      setOpen={setOpen}
      children={
        <>
          <iframe
            width="660"
            height="425"
            src="https://www.youtube.com/embed/BH5-rSxilxo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </>
      }
    />
  );
};

HomeHeroVideo.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.any.isRequired,
};

export default HomeHeroVideo;
