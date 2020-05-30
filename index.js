const puppeteer = require('puppeteer');

const CONFIG = require('./config');
// Grab YT play button
const PLAY_BUTTON = "#movie_player > div.ytp-cued-thumbnail-overlay > button";
// generic YT video path
const URL = "https://www.youtube.com/watch?v=";
// Turns seconds to milliseconds
const MULTIPLIER = 1000;

async function play(duration) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      // This represents your location on windows
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    });
    // Opens Browser
    const page = await browser.newPage();
    // Gets YT video URL
    const url = URL + CONFIG.URL_LIST[randomize(CONFIG.URL_LIST.length - 1, 0)];
    console.log(`URL to PLAY => ${url}`);
    // Opens YT with URL
    await page.goto(url);
    // YT play button clicked
    await page.click(PLAY_BUTTON);
    // Closes Browser TAB after duration passed
    setTimeout(() => {
      browser.close();
    }, duration);
  } catch (error) {
    console.log("ERROR");
  }
};

// Returns a random value between min and max
// No decimals
function randomize(max, min) {
  return Math.floor(Math.random() * max) + min;
}

async function main() {
  for (let index = 0; index < CONFIG.PLAY_COUNT; index++) {
    const PLAY_DURATION = randomize(CONFIG.MAX_DURATION, CONFIG.MIN_DURATION);
    console.log(`${index + 1} :: PLAY VIDEO FOR ${PLAY_DURATION} seconds.`);
    await play(PLAY_DURATION * MULTIPLIER);
  }
}
// App starts here
main();