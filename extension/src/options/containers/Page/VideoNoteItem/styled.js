import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const StyledImg = styled.img`
  @media (max-width: 960px) {
    width: 426px;
    height: 240px;
  }

  width: 640px;
  height: 360px;
`;

export const StyledNoteContainer = styled(Grid)`
  @media (max-width: 960px) {
    width: 426px;
  }

  @media (min-width: 961px) and (max-width: 1280px) {
    width: 640px !important;
  }
`;

export const StyledEditorContainer = styled(Grid)`
  flex: 1;
  border: solid 1px #e1e4e8;
  border-radius: 5px;
`;

export const StyledTextArea = styled(Grid)`
  flex: 1;

  & textarea {
    font-size: 14px;
    padding: 0 10px;
    flex: 1;
    min-height: 150px;
    border: none;
    outline: none;
  }

  & div.markdown-body {
    font-size: 14px;
    padding: 0 10px;
  }
`;
