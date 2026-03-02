import https from 'https';
import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');
const jsFiles = html.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g).map(s => s.replace('src="', '').replace('"', ''));

async function fetchJs() {
    for (const file of jsFiles) {
        const url = `https://test.autoembed.cc${file}`;
        await new Promise((resolve) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    const matches = data.match(/\{name:"[^"]+",url:"[^"]+"\}/g);
                    if (matches) {
                        console.log("Found in", file);
                        console.log(matches);
                    }
                    const matches2 = data.match(/\{name:"[^"]+",id:"[^"]+"\}/g);
                    if (matches2) {
                        console.log("Found in", file);
                        console.log(matches2);
                    }
                    const matches3 = data.match(/\{id:"[^"]+",name:"[^"]+"\}/g);
                    if (matches3) {
                        console.log("Found in", file);
                        console.log(matches3);
                    }
                    resolve();
                });
            }).on('error', resolve);
        });
    }
}

fetchJs();
