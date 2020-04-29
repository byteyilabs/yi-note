import styled from 'styled-components'
import { Modal } from '@material-ui/core'

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledPaper = styled.div`
  background-color: ${props => props.theme.palette.background.paper};
  border: 1px solid #000;
  box-shadow: ${props => props.theme.shadows[2]};
  padding: ${props => props.theme.spacing(2, 4, 3)};
  min-width: 200px;
  max-width: ${props => props.theme.breakpoints.width('md') - 100}px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`
