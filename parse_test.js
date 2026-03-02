import fs from 'fs';

const html = fs.readFileSync('test.html', 'utf8');

// Find anything resembling a server list
const serversMatch = html.match(/"servers":\[(.*?)\]/);
if (serversMatch) {
    console.log(serversMatch[0]);
} else {
    // try to find names of servers
    const names = html.match(/"name":"([^"]+)"/g);
    console.log([...new Set(names)]);
    
    const titles = html.match(/"title":"([^"]+)"/g);
    console.log([...new Set(titles)]);
    
    const ids = html.match(/"id":"([^"]+)"/g);
    console.log([...new Set(ids)]);
}
