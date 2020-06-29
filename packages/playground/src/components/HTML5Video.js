import React, { useLayoutEffect } from 'react';
import mov from '../../mov_bbb.mp4';

const HTML5Video = ({ onRender }) => {
  useLayoutEffect(() => {
    onRender();
  }, [onRender]);

  return (
    <video width="400" controls>
      <source src={mov} type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
  );
};

export default HTML5Video;
