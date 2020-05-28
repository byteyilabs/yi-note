import React, { useLayoutEffect } from 'react';

const YoutubeIframe = ({ onRender }) => {
  useLayoutEffect(() => {
    onRender();
  }, [onRender]);

  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/-rD541GWdDM"
      frameBorder="0"
      allow="accelerometer;autoplay;encrypted-media;gyroscope;"
      allowFullScreen
    />
  );
};

export default YoutubeIframe;
