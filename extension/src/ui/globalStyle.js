import { createGlobalStyle } from 'styled-components';
import { APP_ID } from '../constants';

export default createGlobalStyle`
  #${APP_ID} svg {
    width: 100%;
    height: 100%;
    background: unset;
    color: inherit;
  }
`;
