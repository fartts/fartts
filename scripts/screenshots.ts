#!/usr/bin/env ts-node

import { join } from 'path';

import puppeteer, { Browser } from 'puppeteer';

const baseUrl = 'http://localhost:5000';

const getExperimentUrls = async (browser: Browser) => {
  const page = await browser.newPage();
  await page.goto(join(baseUrl, 'index.html'));

  return await page.evaluate(() =>
    Array.from(document.querySelectorAll('li > a[href]'), (a) =>
      a.getAttribute('href'),
    ),
  );
};

(async () => {
  const browser = await puppeteer.launch();

  const urls = await getExperimentUrls(browser);
  await Promise.all(
    urls.map(async (url) => {
      if (!url) {
        return;
      }

      const page = await browser.newPage();
      await page.goto(join(baseUrl, url));
      await page.waitForTimeout(1_000);

      await page.setViewport({
        width: 1_920,
        height: 1_080,
        deviceScaleFactor: 1,
      });

      const screenshotPath = join(
        process.cwd(),
        'src/lab/assets',
        url.replace('/index.html', '.png'),
      );

      await page.screenshot({
        path: screenshotPath,
      });
    }),
  );

  await browser.close();
})();
