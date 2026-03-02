import https from 'https';

https.get('https://watch-v2.autoembed.cc/movie/tt1375666', (res) => {
  console.log(res.headers);
});
