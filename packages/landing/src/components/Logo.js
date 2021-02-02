import React from 'react';
import { Link } from 'gatsby';
import logo from '../../static/images/logo.png';

const Logo = () => {
  return (
    <div className={'logo'}>
      <Link to="/">
        <img alt={'Logo'} src={logo} />
        <span>YiNote</span>
      </Link>
    </div>
  );
}

export default Logo;
