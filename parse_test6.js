import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');
const apiMatches = html.match(/https?:\/\/[^"'\s]+/g);
if (apiMatches) {
    const uniqueUrls = [...new Set(apiMatches)].filter(u => u.includes('api') || u.includes('json') || u.includes('server'));
    console.log(uniqueUrls);
}
