# YiNote Browser Extension

YiNote, aka TurboNote Chrome Extension, is a great open source tool to boost online learning experience.

- [Introduction](#introduction)
  - [Purpose and history](#purpose-and-history)
  - [Features](#features)
- [Get started](#get-started)
  - [How to use](#how-to-use)
  - [Development](#development)
    - [Prerequisite](#prerequisite)
    - [Install dependencies](#install-dependencies)
    - [Start development](#start-development)
- [About the project](#about-the-project)
  - [Project components](#project-components)
  - [Tech stack](#tech-stack)
  - [Browser support](#browser-support)
- [Contribute](#contribute)
  - [As a community](#as-a-community)
  - [As a developer](#as-a-developer)
- [Roadmap](#roadmap)
- [License](#license)

## Introduction

### Purpose

YiNote, aka TurboNote chrome extension, is developed to help online learner and video editor to bookmark thoughts and ideas in a fine-grained way while working or learning with online materials. It was developed in 2016 as a side project, and luckily loved by thousands users all around the world.

During the COVID-19 pandemic, I rewrote the extension in a more scalable and maintainable approach. Hopefully it can fill the needs from different users, and boost your learning experience to next level.

### Features

- Take time-stamped note while watching online video, currently supported video formats/platform:
  - Youtube video
  - Embedded youtube iframe video
  - HTML5 video
  - Local video via browser
- Bookmark video
- Search through bookmarks and notes
- Export and import of data

### Get started

#### How to use

There are serveral options to use this extension:

- Install extension from [Chrome](https://chrome.google.com/webstore/detail/yinote/fhpgggnmdlmekfdpkdgeiccfkignhkdf) or Firefox web store.
- For existing users, Chrome will automatically update the extension when new versions available. Please see [Migrations Guide](/MIGRATING.md) for more information.
- You can also build the extension, then run it locally. Please see [Development](#development) for more information.

#### Development

##### Prerequisite

Node >= 10.0.0
NPM >= 6.0.0

##### Install dependencies

For NPM v6 or above:

```bash
npm ci
```

For NPM before v6

```bash
npm install
```

##### Start development

To develop `content script`, `background` and `options` page in watch mode. Please run

```bash
npm run dev
```

For `content script` change, you need to reload the extension in `chrome://extensions` tab.

For `background` and `options` changes, just refresh the page should be able to load the changes.

`playgound` mode is also provided for easy `content script` development. This mode will simulate `content script` to inject UI widget in page served from `webpack dev server`

```bash
npm run playground
```

For more information about how to develop browser extensions, please refer to [Chrome extension get started](https://developer.chrome.com/extensions/getstarted)

## About the project

### Project components

This extension inject [content script](https://developer.chrome.com/extensions/content_scripts) to display UI widget and interact with host page.

[Background Scripts](https://developer.chrome.com/extensions/background_pages) is used for message handling and handling data migrations.

[Options page](https://developer.chrome.com/extensions/options) is provided to give more webpage real estate for data management and configuring settings.

YiNote store data in `browser.storage` locally.

### Tech stack

Thanks for the open source community. YiNote depends on lots of awesome open source modules. In the following part, I'll only list part of them to share base knowledge of the how this project is built.

- [React](https://reactjs.org/) for UI components
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy) for routing. `MemoryRouter` is used for `content script`, `HashRouter` is used for `options` page
- [Easy Peasy](https://easy-peasy.now.sh/) for state management
- [react-i18next](https://react.i18next.com/) for internationalization
- [Styled Components](https://styled-components.com/) to write `cssinjs` styled styles
- [Material UI](https://material-ui.com/) for quickly wrapup complex UI components
- [Webpack](https://webpack.js.org/) as bundler

### Browser support

YiNote leverages mozilla's [Web extension polyfill](https://github.com/mozilla/webextension-polyfill) to achieve better support for Chrome, Firefox and other Chrome-compatible browsers. For detailed support informarion, please see [Supported Browsers](https://github.com/mozilla/webextension-polyfill#supported-browsers)

## Contribute

### As a community

- Expose YiNote to more people, share it via blog post, facebook, twitter etc.
- Answer questions in [the issue tracker](https://www.github.com/shuowu/yi-note/issues)
- Support financially on [Patreon](https://www.patreon.com/yinote)

### As a developer

Please read the [Contribution Guide](/CONTRIBUTING.md)

All kinds of contributions from anyone are always welcomed!

## Roadmap

- Web article annotation

- Cloud support for both public and private groups

- Fine grained note sharing

- Multiple devices support

- Turn UI panel into framework agnositc UI widget

## License

Copyright (c) 2016 - 2020

Licensed under the GUN GPL3.0 License. [View license](/LICENSE)
