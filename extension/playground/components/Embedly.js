import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  & iframe {
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
  }
`;

const Embedly = ({ onRender }) => {
  useLayoutEffect(() => {
    onRender();
  }, [onRender]);

  return (
    <StyledContainer>
      <iframe
        frameBorder="0"
        src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F159048928&url=https%3A%2F%2Fvimeo.com%2F159048928&image=http%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F560697717_1280.jpg&key=1d5c48f7edc34c54bdae4c37b681ea2b&type=text%2Fhtml&schema=vimeo"
      />
    </StyledContainer>
  );
};

export default Embedly;
