import https from 'https';

https.get('https://watch-v2.autoembed.cc/movie/tt1375666', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    const servers = data.match(/<li[^>]*class="server"[^>]*>.*?<\/li>/gi);
    if (servers) {
        servers.forEach(s => console.log(s));
    } else {
        console.log("No servers found");
        console.log(data.substring(0, 1000));
    }
  });
}).on('error', console.error);
