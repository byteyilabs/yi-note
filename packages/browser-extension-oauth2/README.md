# browser-extension-oauth2

This module provides wrapper around browser.identity API for Oauth2.0 implicit flow. This module not only handles retrieving and renewing access token from authorization endpoints and properly cache it in `browser.storage.local`, but also provide enhanced fetch functon, `callApi`, to access protected resources with access token properly binded in headers.

## Installation

Please follow either of following options to use this module in your extension project.

### Build extension with bundler like webpack

```bash
npm install browser-extension-oauth2
```

### Add bundle file directly in `manifest.json`

- Clone repo

- Install dependencies

```bash
npm install
```

- Build bundle

```bash
npm run build
```

- Add `index.js` from dist folder to your extension project. Then 

## Development

```bash
npm install
npm run dev
```

## Examples

```js
import Oauth2 from 'browser-extension-oauth2'

// Initial oauth2 instance
const oauth2 = new Oauth2({
  provider: '{provide name}', // Provider name, this will be used in redirectUrl and as storage key
  authorization_endpoint: '{oauth authorization_endpoint}',
  client_id: '{registered client id in idp}',
  scopes: ['{scope}'], // Scopes for api access
  api_base_url: '{api base url}' // Optional, only relative paths need to be provided if callApi method if this config exist
});

// Call resource api, this method follows `fetch` API input with addtional renew token logic provided.
// If no access token available, prompt will popup to ask for user's consent.
oauth2.callApi('/protected-resource')
  .then(data => {
    // Handle resource
  });
```

### License

MIT
