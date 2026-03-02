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
                    if (data.includes('name:') || data.includes('server') || data.includes('url:')) {
                        const matches = data.match(/\{id:"[^"]+",name:"[^"]+",url:"[^"]+"\}/g);
                        if (matches) {
                            console.log("Found in", file);
                            console.log(matches);
                        }
                        const matches2 = data.match(/name:"[^"]+"/g);
                        if (matches2 && matches2.length > 5) {
                            // console.log("Names in", file, matches2);
                        }
                    }
                    resolve();
                });
            }).on('error', resolve);
        });
    }
}

fetchJs();
