import React from 'react';
import PropTypes from 'prop-types';
import { StyledMarkdownBody } from './styled';
import Markdown from '../../services/markdown';

const MarkdownViewer = ({ content = '' }) => {
  return (
    <StyledMarkdownBody
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: Markdown.toHTML(content) }}
    />
  );
};

MarkdownViewer.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkdownViewer;
