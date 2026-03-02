import https from 'https';
import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');
const jsFiles = html.match(/src="([^"]+\.js)"/g);
console.log(jsFiles);
