## 🔭 Biruni Research Assistant
[![Build Status](https://travis-ci.com/sineau/biruni-research-assistant.svg?branch=master)](https://travis-ci.com/sineau/biruni-research-assistant)

(WORK IN PROGRESS)
Browser extension to help you with online research. Works with Firefox and Chrome
Right now you can just view your browser's bookmarks and add note and tags to each bookmark entry inside the extension. But I plan to add highlighting and Bibliography extraction (a la Zotero) later.

## Who's Biruni?
Abu Rayhan Al-Biruni was an Iranian mathematician and astrologist from 10th century. [Read More](https://en.wikipedia.org/wiki/Al-Biruni)

## How to develop
`npm run start:ext` this will start a webpack-dev-server and uses webpack-shell-plugin to start `web-ext run`. The last command will run a Firefox instance with the extension installed and will reload the extension on save. You can also load the dev folder in `Chrome://extensions` and use Chrome as your browser of choice. 

I haven't included a build setup yet.
