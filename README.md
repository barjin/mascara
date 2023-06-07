# Mascara - og:image generator for actors

This repository contains an experimental OG image generator based on the `satori` library. It takes a JSX template as input and generates an image that can be used as the Open Graph image for a website.

## Installation

First, make sure you're running Node 18.0.0 or later - satori requires `fetch` to be available globally.

Then, run `npm install` to install the dependencies. Now you're ready to go!

## Usage

To generate an image, run `node ./index.mjs`. This will generate an image based on the template in `./template.jsx` and save it to `output.png`.

To get an idea how to use this in a larger project, check out the `index.mjs` file. 

## Possible hiccups

Satori is not a full-featured HTML renderer. It only supports a subset of HTML and CSS. If you run into any issues, it's most likely because of this.

___

Jindřich Bär, 2023