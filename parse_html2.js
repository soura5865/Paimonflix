import fs from 'fs';

const html = fs.readFileSync('autoembed.html', 'utf8');
// Find all strings that look like server names or URLs
const urls = html.match(/https?:\/\/[^"'\s]+/g);
if (urls) {
    const uniqueUrls = [...new Set(urls)].filter(u => u.includes('embed') || u.includes('vid') || u.includes('stream'));
    console.log(uniqueUrls);
}
