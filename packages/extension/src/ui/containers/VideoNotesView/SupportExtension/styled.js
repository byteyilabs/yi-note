import styled from 'styled-components';
import { Modal } from '@material-ui/core';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledPaper = styled.div`
  background-color: ${props => props.theme.palette.background.paper};
  box-shadow: ${props => props.theme.shadows[2]};
  padding: ${props => props.theme.spacing(2, 4, 3)};
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  width: 350px;
`;

export const StyledTitle = styled.div`
  font-size: 1.2em;
  font-weight: 500;
`;
