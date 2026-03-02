import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://watch-v2.autoembed.cc/movie/tt1375666', { waitUntil: 'networkidle2' });
  
  // Click "Watch"
  const links = await page.$$('a');
  for (const a of links) {
    const text = await page.evaluate(el => el.textContent, a);
    if (text === 'Watch') {
      await a.click();
      await new Promise(r => setTimeout(r, 2000));
      break;
    }
  }
  
  // Get all server buttons
  const servers = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const serverButtons = buttons.filter(b => {
      const p = b.parentElement;
      return p && p.textContent.includes('Select a server');
    });
    
    // Actually, let's just find the container with servers
    const container = document.querySelector('.grid.grid-cols-2') || document.querySelector('.flex.flex-wrap');
    if (container) {
      return Array.from(container.querySelectorAll('button')).map(b => {
        return {
          name: b.textContent.trim(),
          className: b.className
        };
      });
    }
    
    // Or just all buttons that are not standard nav
    return buttons.map(b => b.textContent.trim()).filter(t => t && t.length < 15 && !['Movies', 'TV Shows', 'More', 'Account', 'Menu', 'Play Now', 'Watchlist'].includes(t));
  });
  
  console.log("Servers:", servers);
  
  // Now let's click each server and get the iframe src
  const serverUrls = [];
  const serverNames = servers.slice(0, 15); // Just get the first 15
  
  for (const name of serverNames) {
    await page.evaluate((n) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent.trim() === n);
      if (btn) btn.click();
    }, name);
    
    await new Promise(r => setTimeout(r, 1000));
    
    const iframeSrc = await page.evaluate(() => {
      const iframe = document.querySelector('iframe');
      return iframe ? iframe.src : null;
    });
    
    serverUrls.push({ name, url: iframeSrc });
  }
  
  console.log("Server URLs:", serverUrls);
  
  await browser.close();
})();
