import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://watch-v2.autoembed.cc/movie/tt1375666', { waitUntil: 'networkidle2' });
  
  // Click "Play Now" or "Watch"
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Play Now')) {
      await b.click();
      await new Promise(r => setTimeout(r, 2000));
      break;
    }
  }
  
  const links = await page.$$('a');
  for (const a of links) {
    const text = await page.evaluate(el => el.textContent, a);
    if (text === 'Watch') {
      await a.click();
      await new Promise(r => setTimeout(r, 2000));
      break;
    }
  }
  
  const allText = await page.evaluate(() => document.body.innerText);
  console.log("All text after click:", allText.substring(0, 1000));
  
  // Look for server names
  const servers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, li, a, div'))
      .map(el => el.textContent.trim())
      .filter(t => t.toLowerCase().includes('server') || t.includes('VidSrc') || t.includes('Embed'));
  });
  console.log("Servers found:", [...new Set(servers)]);
  
  await browser.close();
})();
