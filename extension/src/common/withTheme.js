import React from 'react'
import merge from 'deepmerge'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'


const muiTheme = createMuiTheme({
  zIndex: {
    modal: 8100,
    tooltip: 8050
  }
})

const styledTheme = {
  header: {
    height: 45
  },
  footer: {
    height: 60
  },
  panel: {
    width: 380,
    zIndex: 8000
  }
}

const theme = merge(muiTheme, styledTheme)

export default Component => () => (
  <StyledThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <Component />
    </MuiThemeProvider>
  </StyledThemeProvider>
)
