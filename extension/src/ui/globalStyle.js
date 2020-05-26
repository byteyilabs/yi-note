import { createGlobalStyle } from 'styled-components';
import { APP_ID } from '../constants';

export default createGlobalStyle`
  .${APP_ID} :not(svg) {
    font-size: 16px;
  }

  .${APP_ID} svg {
    width: 24px;
    height: 24px;
  }

  .${APP_ID} .panel-shadow {
    -webkit-box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
    box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
  }
`;
