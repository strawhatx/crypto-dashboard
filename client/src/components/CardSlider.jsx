import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";

import "swiper/css";

const CardSlider = (children) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={4}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {children.map((item, index) => (
        <SwiperSlide key={item} virtualIndex={index}>
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

CardSlider.propTypes = {
  children: PropTypes.array.isRequired,
};

export default CardSlider;
