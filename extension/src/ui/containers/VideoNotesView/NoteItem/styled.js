import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import ExpandIcon from '@material-ui/icons/ChevronRight'

export const StyledMainRow = styled(Grid)`
  background: #f6f6f6;
  height: 36px;
`

export const StyledExpandedSection = styled(Grid)`
  padding: ${props => (props.expanded ? 4 : 0)}px;
  border-top: ${props => props.expanded && '1px solid #d3d3d3'};
  max-height: ${props => (props.expanded ? 100 : 0)}px;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
`

export const StyledExpandMoreIcon = styled(ExpandIcon)`
  transform: ${({ expanded }) => expanded && 'rotate(90deg)'};
  transition: all 0.1s ease-in-out;
`

export const StyledSummary = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const StyledNote = styled.div`
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  max-height: 60px;
  overflow-y: scroll;
`

export const StyledTimestamp = styled.div`
  font-weight: 500;
  padding: 0 2px;
`
