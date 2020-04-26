import React from 'react'
import StyledThemeProvider from './styled'
import MuiThemeProvider from './mui'

export default Component => () => (
  <StyledThemeProvider>
    <MuiThemeProvider>
      <Component />
    </MuiThemeProvider>
  </StyledThemeProvider>
)
