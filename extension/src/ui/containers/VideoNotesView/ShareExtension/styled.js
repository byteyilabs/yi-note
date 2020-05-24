import styled from 'styled-components';
import { Modal, CircularProgress } from '@material-ui/core';

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

export const StyledSpinner = styled(CircularProgress)`
  & svg {
    width: 40px;
    height: 40px;
  }
`;
