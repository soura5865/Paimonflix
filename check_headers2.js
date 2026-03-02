import https from 'https';

const req = https.get('https://player.autoembed.cc/embed/movie/tt1375666', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  },
  timeout: 5000
}, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", res.headers);
}).on('error', console.error);

req.on('timeout', () => {
  req.destroy();
  console.log('timeout');
});
