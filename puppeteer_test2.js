import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://watch-v2.autoembed.cc/movie/tt1375666', { waitUntil: 'networkidle2' });
  
  const html = await page.content();
  console.log(html.substring(0, 500));
  
  if (html.includes('cloudflare') || html.includes('Just a moment')) {
    console.log("Cloudflare blocked");
  } else {
    const buttons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button')).map(b => b.textContent);
    });
    console.log("Buttons:", buttons);
    
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(a => a.textContent);
    });
    console.log("Links:", links);
  }
  
  await browser.close();
})();
