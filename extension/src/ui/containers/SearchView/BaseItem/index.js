import React from 'react';
import PropTypes from 'prop-types';

const toHighlightedHTML = (origin = '', query = '') => {
  if (query.length < 2) {
    return origin;
  }

  const regex = new RegExp(`(${query})`, 'gi');
  return origin.replace(
    regex,
    '<span style="background-color: #ffff00">$1</span>'
  );
};

const BaseItem = ({ origin, query }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: toHighlightedHTML(origin, query)
      }}
    />
  );
};

BaseItem.propTypes = {
  origin: PropTypes.string.isRequired,
  query: PropTypes.string
};

export default BaseItem;
