import { createGlobalStyle } from 'styled-components';
import { APP_ID } from '../constants';

export default createGlobalStyle`
  html, body {
    height: 100%;
  }

  #${APP_ID} {
    font-size: 16px;
  }
`;
