import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const PrivacyPage = () => (
  <Layout>
    <SEO title="Privacy Policy" />
    <div className={'container'}>
      <div className={'content'}>
        <div className={'title'}>
          <h1>Privacy Policy</h1>
        </div>

        <p>This Privacy Policy governs the manner in which YiNote chrome extension collects, uses, maintains and discloses information collected from users (each, a "User") of the https://www.yinote.co website ("Site").</p>

        <h3>Personal identification information</h3>
        <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, email address. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.</p>

        <h3>Non-personal identification information</h3>
        <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>

        <h3>Web browser cookies</h3>
        <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>

        <h3>How we use collected information</h3>
        <p>YiNote browser extension may collect and use Users personal information for the following purposes:</p>
        <ul>
          <li>
            <i>To run and operate our Site</i><br/>
            We may need your information display content on the Site correctly.
          </li>
          <li>
            <i>To improve customer service</i><br/>
            Information you provide helps us respond to your customer service requests and support needs more efficiently.
          </li>
          <li>
            <i>To improve our Site</i><br/>
            We may use feedback you provide to improve our products and services.
          </li>
          <li>
            <i>To send periodic emails</i><br/>
          </li>
        </ul>

        <h3>How we protect your information</h3>
        <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>

        <h3>Sharing your personal information</h3>
        <p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. </p>

        <h3>Electronic newsletters</h3>
        <p>If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc.</p>

        <h3>Changes to this privacy policy</h3>
        <p>YiNote browser extension has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site, revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

        <h3>Your acceptance of these terms</h3>
        <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

        <p>This document was last updated on November 27, 2020</p>

      </div>
    </div>
  </Layout>
);

export default PrivacyPage;
