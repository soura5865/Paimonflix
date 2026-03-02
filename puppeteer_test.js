import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://watch-v2.autoembed.cc/movie/tt1375666', { waitUntil: 'networkidle2' });
  
  const servers = await page.evaluate(() => {
    const serverElements = document.querySelectorAll('li.server, .server, [data-server], button, a');
    const results = [];
    serverElements.forEach(el => {
      if (el.textContent.toLowerCase().includes('server') || el.getAttribute('data-server') || el.textContent.includes('VidSrc') || el.textContent.includes('Embed')) {
        results.push({
          text: el.textContent.trim(),
          html: el.outerHTML
        });
      }
    });
    return results;
  });
  
  console.log(servers);
  
  await browser.close();
})();
