import https from 'https';
import fs from 'fs';

https.get('https://watch-v2.autoembed.cc/movie/tt1375666', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('autoembed.html', data);
    console.log("Saved to autoembed.html");
  });
}).on('error', console.error);
