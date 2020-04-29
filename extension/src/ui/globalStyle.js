import { createGlobalStyle } from 'styled-components'
import { APP_ID } from '../constants'

export default createGlobalStyle`
  #${APP_ID} :not(svg|*) {
    all: unset;
  }

  #${APP_ID} svg {
    width: 100%;
    height: 100%;
    background: unset;
    color: inherit;
  }

  #${APP_ID} {
    font-size: 16px;
  }

  #${APP_ID} .panel-shadow {
    -webkit-box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
    box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
  }
`
