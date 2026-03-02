import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');
const lines = html.split(/\\n|\\r|\[|\]|\{|\}/);
lines.forEach(l => {
    if (l.includes('name') || l.includes('server') || l.includes('url')) {
        console.log(l.substring(0, 100));
    }
});
