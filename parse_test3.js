import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');
const scriptMatches = html.match(/<script>self\.__next_f\.push\((.*?)\)<\/script>/g);
if (scriptMatches) {
    scriptMatches.forEach(m => {
        if (m.includes('servers') || m.includes('url')) {
            console.log(m.substring(0, 500));
        }
    });
}
