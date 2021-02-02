import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import chromeLogo from '../../static/images/chrome-48.png';
import firefoxLogo from '../../static/images/firefox-48.png';
import edgeLogo from '../../static/images/microsoft-edge-48.png';

const Header = ({ siteTitle }) => {
  const { t } = useTranslation('header');

  return (
    <header>
      <div className={'container'}>
        <div className={'top-menu'}>
          <Logo />

          <div className={'download'}>
            <span>Available on:</span>
            <a href="https://chrome.google.com/webstore/detail/yinote/fhpgggnmdlmekfdpkdgeiccfkignhkdf">
              <img src={chromeLogo} alt="chrome" />
            </a>
            <a href="https://addons.mozilla.org/en-CA/firefox/addon/yinote/">
              <img src={firefoxLogo} alt="firefox" />
            </a>
            <a href="https://microsoftedge.microsoft.com/addons/detail/gieehphfgjfjmeejdohpdiajmicjnfbh">
              <img src={edgeLogo} alt="edge" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
