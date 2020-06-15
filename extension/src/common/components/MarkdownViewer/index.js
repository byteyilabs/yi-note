import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import marked from 'marked';

const StyledMarkdownBody = styled.div`
  font-size: 14px;
`;

const MarkdownViewer = ({ content }) => {
  const formattedContent = marked(content);

  return (
    <StyledMarkdownBody
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};

MarkdownViewer.propTypes = {
  content: PropTypes.string.isRequired
};

export default MarkdownViewer;
