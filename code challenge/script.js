const fs = require('fs');
const url = require('url');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3303;


const tutor = fs.readFileSync(`${__dirname}/html/index.html`, 'utf8');
const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'my-own-header': 'home pages',
        });
        res.end(tutor);
    }
    else if (pathname === 'contactus') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
           'my-own-header': 'contact us',
        });
        res.end("<h1>This is the contactus</h1>")
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
 