import React from 'react'
import merge from 'deepmerge'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { blue, red } from '@material-ui/core/colors'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const muiTheme = createMuiTheme({
  zIndex: {
    modal: 8000,
    tooltip: 8050
  },
  palette: {
    primary: { ...red, main: red[700] },
    secondary: blue
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
