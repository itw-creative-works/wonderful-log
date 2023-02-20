<p align="center">
  <a href="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg" width="100px">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/itw-creative-works/wonderful-log.svg">
  <br>
  <img src="https://img.shields.io/david/itw-creative-works/wonderful-log.svg">
  <img src="https://img.shields.io/david/dev/itw-creative-works/wonderful-log.svg">
  <img src="https://img.shields.io/bundlephobia/min/wonderful-log.svg">
  <img src="https://img.shields.io/codeclimate/maintainability-percentage/itw-creative-works/wonderful-log.svg">
  <img src="https://img.shields.io/npm/dm/wonderful-log.svg">
  <img src="https://img.shields.io/node/v/wonderful-log.svg">
  <img src="https://img.shields.io/website/https/itwcreativeworks.com.svg">
  <img src="https://img.shields.io/github/license/itw-creative-works/wonderful-log.svg">
  <img src="https://img.shields.io/github/contributors/itw-creative-works/wonderful-log.svg">
  <img src="https://img.shields.io/github/last-commit/itw-creative-works/wonderful-log.svg">
  <br>
  <br>
  <a href="https://itwcreativeworks.com">Site</a> | <a href="https://www.npmjs.com/package/wonderful-log">NPM Module</a> | <a href="https://github.com/itw-creative-works/wonderful-log">GitHub Repo</a>
  <br>
  <br>
  <strong>wonderful-log</strong> is an improved logging system for Node.js!
  <br>
  <br>
  <img src="https://media.giphy.com/media/3o7WIEVjXL8EH3a1mE/giphy.gif">
  <br>
  <br>
</p>

## Features
* Log to the console AND to a file!?

## Install Wonderful Log
### Install via npm
Install with npm if you plan to use `wonderful-log` in a Node project or in the browser.
```shell
npm install wonderful-log
```

```js
const Logger = require('wonderful-log');
const logger = new Logger({
  console: {
    // Whether to enable logging to console (default: true)
    enabled: true,
  },
  file: {
    // Whether to enable saving logs to file (default: true)
    enabled: true,
    // Where to save the logs (default: ./logs)
    path: 'path/to/log',
  },
});
```

## Using Wonderful Log
After you have followed the install step, you can start using `wonderful-log` to make requests to any URL.

### log(...arguments)
The `log()` method will log the arguments to the console and to the file.

### warn(...arguments)
The `warn()` method will warn the arguments to the console and to the file.

### error(...arguments)
The `error()` method will error the arguments to the console and to the file.

## Extending Capabilities
For a more in-depth documentation of this library and the Wonderful Log service, please visit the official Wonderful Log website.

## What Can Wonderful Log do?
Wonderful Log is a free log api that helps you make better logs in your application.

## Final Words
If you are still having difficulty, we would love for you to post a question to [the Wonderful Log issues page](https://github.com/itw-creative-works/wonderful-log/issues). It is much easier to answer questions that include your code and relevant files! So if you can provide them, we'd be extremely grateful (and more likely to help you find the answer!)

## Projects Using this Library
[Somiibo](https://somiibo.com/): A Social Media Bot with an open-source module library. <br>
[JekyllUp](https://jekyllup.com/): A website devoted to sharing the best Jekyll themes. <br>
[Slapform](https://slapform.com/): A backend processor for your HTML forms on static sites. <br>
[SoundGrail Music App](https://app.soundgrail.com/): A resource for producers, musicians, and DJs. <br>
[Hammock Report](https://hammockreport.com/): An API for exploring and listing backyard products. <br>

Ask us to have your project listed! :)
