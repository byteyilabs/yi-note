const Evernote = require('evernote');

const getClient = () => {
  return new Evernote.Client({
    consumerKey: process.env.EVERNOTE_CONSUMER_KEY,
    consumerSecret: process.env.EVERNOTE_CONSUMER_SECRET,
    sandbox: false,
  });
};

const getAuthorizeUrl = (event, context, callback) => {
  let { redirect_url: redirectUrl } = event.queryStringParameters || {};
  redirectUrl = decodeURIComponent(redirectUrl);
  const callbackUrlsWhitelist = Object.keys(process.env)
    .filter((key) => key.includes('ALLOWED_REDIRECT_URL'))
    .map((key) => process.env[key]);
  if (!callbackUrlsWhitelist.includes(redirectUrl)) {
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized redirect url.' }),
    });
  }

  const client = getClient();
  client.getRequestToken(redirectUrl, (err, oauthToken, oauthSecret) => {
    if (err) {
      console.log(err);
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: err.message }),
      });
    }

    const oauthUrl = client.getAuthorizeUrl(oauthToken);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        oauthUrl,
        oauthToken,
        oauthSecret,
      }),
    };
    callback(null, response);
  });
};

const getAccessToken = (event, context, callback) => {
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid input' })
    });
  }

  const { oauthToken, oauthSecret, verifier } = payload;
  const client = getClient();
  client.getAccessToken(
    oauthToken,
    oauthSecret,
    verifier,
    (err, accessToken) => {
      if (err) {
        return callback(null, {
          statusCode: 500,
          body: JSON.stringify({ message: err.message }),
        });
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ accessToken }),
      });
    }
  );
};

module.exports = {
  getAuthorizeUrl,
  getAccessToken,
};
