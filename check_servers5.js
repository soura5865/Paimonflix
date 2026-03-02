import https from 'https';
import fs from 'fs';

https.get('https://player.autoembed.cc/embed/movie/tt1375666', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('player.html', data);
    console.log("Saved to player.html", res.statusCode);
  });
}).on('error', console.error);
