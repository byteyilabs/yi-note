import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const sizeMap = {
  small: 18,
  medium: 24,
  large: 30
};

const StyledContainer = styled.div`
  width: ${({ size }) => sizeMap[size]}px;
  height: ${({ size }) => sizeMap[size]}px;
  display: block;
  cursor: pointer;
  color: ${props => props.color};
  padding: 0 2px;

  svg {
    width: ${({ size }) => sizeMap[size]}px;
    height: ${({ size }) => sizeMap[size]}px;
  }
`;

const useStyles = makeStyles({
  tooltip: { fontSize: '10px' }
});

const IconButton = ({ size, color, tooltip, children, onClick }) => {
  const classes = useStyles();

  if (tooltip) {
    return (
      <Tooltip title={tooltip} classes={{ tooltip: classes.tooltip }}>
        <StyledContainer size={size} color={color} onClick={onClick}>
          {children}
        </StyledContainer>
      </Tooltip>
    );
  } else {
    return (
      <StyledContainer size={size} color={color} onClick={onClick}>
        {children}
      </StyledContainer>
    );
  }
};

IconButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired
};

IconButton.defaultProps = {
  size: 'medium',
  color: '#000000'
};

export default IconButton;
