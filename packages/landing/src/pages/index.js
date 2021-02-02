import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import featureImage from '../../static/images/hero.png';

const IndexPage = () => {
  const title = 'Take Time-stamped Notes While Watching Videos!';
  
  return (
    <Layout>
      <SEO title={title} />
      <div className={'page-header home'}>
        <div className="container">
          <h1>{title}</h1>
          <p>
            YiNote, aka TurboNote Chrome Extension, is an effective tool to take and share notes while watching online videos. 
            It's a must-have tool for users who work with online video materials.
          </p>
          <img alt={'Dashboard'} src={featureImage} />
        </div>
      </div>
  
    </Layout>
  )
};

export default IndexPage;
