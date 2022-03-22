import React from "react";
import { ThreeCircles } from "react-loader-spinner";
//import "./spinner.css";
import { useLoadingStore } from "../stores/loading";
import PropTypes from "prop-types";

const LoadingIndicator = ({ view }) => {
  const { isLoading } = useLoadingStore((state) => ({
    isLoading: state.isLoading,
  }));

  return (
    <>
      {isLoading && (
        <div className="spinner">
          <ThreeCircles color="#2BAD60" height="100" width="100" />
        </div>
      )}

      {!isLoading && view}
    </>
  );
};

LoadingIndicator.propTypes = {
  view: PropTypes.any,
};

export default LoadingIndicator;
