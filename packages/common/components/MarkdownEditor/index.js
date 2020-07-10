import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Grid, Divider } from '@material-ui/core';
import MarkdownViewer from '../MarkdownViewer';
import IconButton from '../IconButton';
import { MarkdownIcon } from '../../icons';

const EDITOR_MIN_WIDTH = 100;

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
    min-height: ${EDITOR_MIN_WIDTH}px;
    border: none;
    outline: none;
    word-break: break-word;
  }

  & div.markdown-body {
    font-size: 14px;
    padding: 0 10px;
    min-height: ${EDITOR_MIN_WIDTH}px;
  }
`;

const StyledMode = styled.div`
  padding: 3px 5px;
  font-weight: ${props => (props.selected ? '500' : '400')};
  cursor: pointer;
`;

const EDIT_MODE_WRITE = 'WRITE';
const EDIT_MODE_PREVIEW = 'PREVIEW';

const MarkdownEditor = ({
  disabled,
  content = '',
  placeholder,
  onChange,
  ...rest
}) => {
  const { t } = useTranslation('editor');
  const [mode, setMode] = useState(EDIT_MODE_WRITE);

  const EDIT_MODES = [
    { key: EDIT_MODE_WRITE, value: t('mode.write') },
    { key: EDIT_MODE_PREVIEW, value: t('mode.preview') }
  ];

  const handleModeChange = mode => setMode(mode);

  const handleValueChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  const handleOpenMarkdownGuide = () => {
    window.open(
      'https://guides.github.com/features/mastering-markdown/',
      '_blank'
    );
  };

  return (
    <StyledEditorContainer
      container
      spacing={1}
      direction="column"
      justify="flex-start"
    >
      <Grid item container spacing={1} direction="row" justify="space-between">
        <Grid item>
          <Grid container alignItems="center">
            {EDIT_MODES.map(m => (
              <Grid key={m.key} item>
                <StyledMode
                  selected={m.key === mode}
                  onClick={handleModeChange.bind(null, m.key)}
                >
                  {m.value}
                </StyledMode>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            size="large"
            tooltip={t('markdown.tooltip')}
            onClick={handleOpenMarkdownGuide}
          >
            <MarkdownIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <StyledTextArea item container>
        {mode === EDIT_MODE_WRITE ? (
          <textarea
            disabled={disabled}
            placeholder={placeholder}
            value={content}
            onChange={handleValueChange}
            {...rest}
          />
        ) : (
          <MarkdownViewer content={content} />
        )}
      </StyledTextArea>
    </StyledEditorContainer>
  );
};

MarkdownEditor.propTypes = {
  disabled: PropTypes.bool,
  content: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default MarkdownEditor;
