import https from 'https';
import http from 'http';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(fetchUrl(res.headers.location));
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }
    }).on('error', reject);
  });
}

fetchUrl('https://player.autoembed.cc/embed/movie/tt1375666')
  .then(html => {
    const matches = html.match(/data-server="([^"]+)"/g) || [];
    const names = html.match(/>([^<]+)<\/a><\/li>/g) || [];
    console.log("HTML length:", html.length);
    console.log("Matches:", matches);
    console.log("Names:", names);
    
    // Let's just print lines containing 'server'
    const lines = html.split('\n').filter(l => l.toLowerCase().includes('server') || l.toLowerCase().includes('data-id'));
    console.log("Lines with server:", lines.slice(0, 20));
  })
  .catch(console.error);
