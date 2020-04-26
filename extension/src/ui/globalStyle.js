import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  #yi-note :not(svg|*) {
    all: unset;
  }

  #yi-note svg {
    width: 100%;
    height: 100%;
    background: unset;
    color: inherit;
  }

  #yi-note {
    font-size: 16px;
  }

  #yi-note .panel-shadow {
    -webkit-box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
    box-shadow: -6px 9px 11px -2px rgba(0,0,0,0.75);
  }
`
