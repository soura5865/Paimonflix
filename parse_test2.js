import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');
console.log(html.substring(0, 2000));
console.log("...");
console.log(html.substring(html.length - 2000));
