const fs = require('fs');
const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3303;
const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.writeHead('content-type', 'text/html');
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview')
        res.end("THIS IS THE OVERVIEW");
    else if (pathName === '/product')
            res.end('THIS IS THE PRODUCT');
    else {
        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello world',
        });
        res.end('<h1>404 not found page</h1>');}
    

    console.log(req.url);
    
    // console.log(req);
    
    // res.end("这世界也许没有你想的那么好，但是也不会有你那么差!");

})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    
})


// read file 
// blocking synchronous
/*
const read = fs.readFileSync('./txt/read-this.txt', 'utf-8');
console.log(read);
const write = `this is jackdeng write: ${read}\n. create on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',write);
console.log('out done!');
*/

// non-blocking asynchronous

// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//      console.log(data);
// })

// callback hell
/*
fs.readFile('./txt/start.tx', 'utf-8', (err, data1) => {
    if (err) return console.log('false');
    
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/input.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data2}\n ${data3}`, 'utf-8', (err) => {
                console.log('written');
                
            })
        
        })
        
    
    })


})

console.log('will read file');
*/

    

