import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from '../../services/markdown';

const StyledMarkdownBody = styled.div`
  font-size: 14px;
`;

const MarkdownViewer = ({ content }) => {
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
