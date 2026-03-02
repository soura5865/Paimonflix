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
                    if (data.includes('vidsrc') || data.includes('superembed') || data.includes('vidlink')) {
                        console.log("Found keywords in", file);
                        const parts = data.split('vidsrc');
                        console.log(parts[0].substring(parts[0].length - 100) + 'vidsrc' + parts[1].substring(0, 100));
                    }
                    resolve();
                });
            }).on('error', resolve);
        });
    }
}

fetchJs();
