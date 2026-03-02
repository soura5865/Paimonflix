import https from 'https';

https.get('https://images.metahub.space/poster/medium/tt0111161/img', (res) => {
  console.log(res.statusCode);
});
