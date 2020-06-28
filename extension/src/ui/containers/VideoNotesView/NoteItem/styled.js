import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { ChevronRight as ExpandIcon } from '@material-ui/icons';

export const StyledMainRow = styled(Grid)`
  background: #f6f6f6;
  height: 36px;
`;

export const StyledExpandedSection = styled(Grid)`
  padding: ${props => (props.expanded ? 4 : 0)}px;
  border-top: ${props => props.expanded && '1px solid #d3d3d3'};
  max-height: ${props => (props.expanded ? 400 : 0)}px;
  overflow: hidden;
  overflow-y: scroll;
  transition: max-height 0.2s ease-in-out;
`;

export const StyledExpandMoreIcon = styled(ExpandIcon)`
  transform: ${({ expanded }) => expanded && 'rotate(90deg)'};
  transition: all 0.1s ease-in-out;
`;

export const StyledSummary = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledNote = styled.div`
  width: 360px;
`;

export const StyledTimestamp = styled.div`
  font-weight: 500;
  padding: 0 2px;
`;
