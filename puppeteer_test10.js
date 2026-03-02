import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  await page.goto('https://watch-v2.autoembed.cc/movie/tt1375666', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  
  // Click "Play Now"
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Play Now')) {
      await b.click();
      await new Promise(r => setTimeout(r, 5000));
      break;
    }
  }
  
  const allText = await page.evaluate(() => document.body.innerText);
  console.log("All text after click:", allText.substring(0, 1000));
  
  const serverButtons = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.map(b => b.textContent.trim()).filter(t => t && t.length < 15 && !['Movies', 'TV Shows', 'More', 'Account', 'Menu', 'Play Now', 'Watchlist', 'Scroll to top', '8.4'].includes(t));
  });
  
  console.log("Server buttons:", serverButtons);
  
  const results = [];
  for (const name of serverButtons) {
    await page.evaluate((n) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim() === n);
      if (btn) btn.click();
    }, name);
    
    await new Promise(r => setTimeout(r, 2000));
    
    const iframeSrc = await page.evaluate(() => {
      const iframe = document.querySelector('iframe');
      return iframe ? iframe.src : null;
    });
    
    results.push({ name, url: iframeSrc });
  }
  
  console.log("Results:", results);
  
  await browser.close();
})();
