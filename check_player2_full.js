import https from 'https';
import fs from 'fs';

https.get('https://player2.autoembed.cc/embed/movie/27205', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('player2.html', data);
    console.log("Saved to player2.html");
  });
}).on('error', console.error);
