import fs from 'fs';

const html = fs.readFileSync('autoembed.html', 'utf8');
// look for servers array in the Next.js page data
const match = html.match(/self\.__next_f\.push\((.*)\)/g);
if (match) {
  match.forEach(m => {
    if (m.includes('servers')) {
      console.log(m.substring(0, 500));
    }
  });
}

// Just look for anything resembling a server list
const serversMatch = html.match(/"servers":\[(.*?)\]/);
if (serversMatch) {
    console.log(serversMatch[0]);
} else {
    // try to find names of servers
    const names = html.match(/"name":"([^"]+)"/g);
    console.log([...new Set(names)]);
}
