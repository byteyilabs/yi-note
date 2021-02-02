/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';

import Header from './header';
import Logo from './Logo';
import '../../static/styles/main.scss';
import '../i18n';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
        <footer>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-6'}>
                <div className={'widget__item'}>
                  <Logo />
                  <div className={'about'}>
                    <p>
                      A browser extension that was created with the goal of solving the
                      problems of note-taking for online video materials.
                    </p>
                  </div>
                </div>
              </div>

              <div className={'col-6'}>
                <div className={'widget__item'}>
                  <div className={'links'}>
                    <h4>Support</h4>
                    <ul>
                      <li>
                        <a href="https://github.com/shuowu/yi-note/issues" target="_blank">
                          GitHub
                        </a>
                      </li>
                      <li>
                        <Link to="/privacy" title={'Privacy Policy'}>
                          Privacy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className={'copyright'}>
              <p>
                Copyright {new Date().getFullYear()}, YiNote. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
