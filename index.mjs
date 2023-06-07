import { readFile, writeFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import babel from '@babel/core';
import fs from 'fs/promises';

await babel.transformFileAsync('./template.jsx', {
    presets: ['@babel/preset-react'],
}).then(async (result) => {
    await fs.unlink('./template.mjs');
    await fs.writeFile('./template.mjs', result.code);
});

const { ogImage } = await import('./template.mjs');

const svg = await satori(
  await ogImage({
    actorName: "A whole new scraper",
    tag: "barjin/google-maps-scraper",
    tags: [
      'Developer examples', 
      'Developer tools', 
      'Social media',
    ],
    users: 512e3,
    runs: 12234456,
    actorIconUrl: "https://images.apifyusercontent.com/1VrdawICnxIwM4X5JzRJHPBmLx0OpmiNxtHGGLmxdu8/rs:fill:92:92/aHR0cHM6Ly9hcGlmeS1pbWFnZS11cGxvYWRzLXByb2QuczMuYW1hem9uYXdzLmNvbS9hWUcwbDlzN2RiQjdqM2diUy9QZlRvRU5rSlp4YWh6UER1My1DbGVhblNob3RfMjAyMy0wMy0yOF9hdF8xMC40MC4yMF8yeC5wbmc.webp",
    authorName: "Jindřich Bär",
    authorAvatarUrl: 'https://images.apifyusercontent.com/zjE6HsCGWSc72d1KHe4AY8ZcFQjOwc8kafVnqB4bRqw/rs:fill:192:192/aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKd0FYekJCcWl1S3BxeU1mU1hnWXk0M3oyNjg3cFh5UjZHbmZLQmo9czk2LWM.webp',
  }), {
    width: 1200,
    height: 630,
    fonts: [
    {
      name: "Graphik-Semibold",
      data: await readFile("./fonts/Graphik-Semibold.otf"),
      weight: 700,
      style: "normal",
    },
    {
      name: "Graphik-Regular",
      data: await readFile("./fonts/Graphik-Regular.otf"),
      weight: 400,
      style: "normal",
    },
  ],
});
 

const resvg = new Resvg(svg, {
  background: "rgba(255,255,255,1)",
});

await writeFile("./output.png", resvg.render().asPng());

