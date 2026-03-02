import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.goto('https://watch-v2.autoembed.cc/movie/27205/watch', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 5000));
  
  const html = await page.content();
  console.log(html.substring(0, 1000));
  
  const allText = await page.evaluate(() => document.body.innerText);
  console.log("All text:", allText.substring(0, 1000));
  
  await browser.close();
})();
