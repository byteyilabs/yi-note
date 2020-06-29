import styled from 'styled-components';

export const StyledDrawer = styled.div`
  display: flex;
  position: fixed;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: ${props => props.theme.panel.width}px;
  top: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  color: #000000;
  overflow: hidden;
  z-index: ${props => props.theme.panel.zIndex};
  transition: transform 0.3s;
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(100%)')};

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const StyledViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  width: -webkit-fill-available;
  width: -moz-fill-available;
  word-break: break-all;
  height: calc(
    100% - ${props => props.theme.header.height}px -
      ${props => props.theme.footer.height}px
  );

  & > div {
    margin-bottom: 8px;
  }
`;
