import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-weight: 500;
  font-size: 0.9em;
  cursor: pointer;
  padding: 0;
  border: none;
  background: none;
  color: ${props => props.color};
`

const TextButton = ({ children, color, onClick }) => {
  return (
    <StyledButton color={color} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string
}

TextButton.defaultProps = {
  color: '#4763ff'
}

export default TextButton
