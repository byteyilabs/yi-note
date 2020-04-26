import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const theme = createMuiTheme({
  zIndex: {
    modal: 8100,
    tooltip: 8050
  }
})

const MuiThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MuiThemeProvider
