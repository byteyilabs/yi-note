import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

const theme = {
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

const StyledThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

StyledThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default StyledThemeProvider
