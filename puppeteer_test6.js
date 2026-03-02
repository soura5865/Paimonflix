import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://watch-v2.autoembed.cc/movie/tt1375666', { waitUntil: 'networkidle2' });
  
  const watchLink = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Watch');
    return a ? a.href : null;
  });
  
  console.log("Watch link:", watchLink);
  
  if (watchLink) {
    await page.goto(watchLink, { waitUntil: 'networkidle2' });
    
    // Wait for servers to load
    await new Promise(r => setTimeout(r, 3000));
    
    const serverButtons = await page.evaluate(() => {
      // Find the container with "Select a server" text
      const allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      let serverContainer = null;
      while (node = allTextNodes.nextNode()) {
        if (node.nodeValue.includes('Select a server')) {
          serverContainer = node.parentElement.parentElement;
          break;
        }
      }
      
      if (!serverContainer) return [];
      
      return Array.from(serverContainer.querySelectorAll('button')).map(b => b.textContent.trim());
    });
    
    console.log("Server buttons:", serverButtons);
    
    const results = [];
    for (const name of serverButtons) {
      await page.evaluate((n) => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent.trim() === n);
        if (btn) btn.click();
      }, name);
      
      await new Promise(r => setTimeout(r, 1500));
      
      const iframeSrc = await page.evaluate(() => {
        const iframe = document.querySelector('iframe');
        return iframe ? iframe.src : null;
      });
      
      results.push({ name, url: iframeSrc });
    }
    
    console.log("Results:", results);
  }
  
  await browser.close();
})();
