import https from 'https';

https.get('https://player.autoembed.cc/embed/movie/tt1375666', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", res.headers);
}).on('error', console.error);
