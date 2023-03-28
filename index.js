const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const hostname = '127.0.0.1';
const port = 3303;
const template_overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const template_product = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const template_card = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.writeHead('content-type', 'text/html');
    // res.setHeader()
    // const pathName = req.url;
    // console.log(req.url);
   const {query, pathname} = url.parse(req.url, true);
   console.log(pathname);
   
 
   
//    console.log(urlParse.query.id);
   
//    console.log(query, pathname);
   
    
    

    // overview
    if (pathname === '/' || pathname === '/overview') {

        
        // res.end("THIS IS THE OVERVIEW");
        res.writeHead(200, {
            'content-type': 'text/html',
        })
        const cardsHtml = dataObj.map(el => replaceTemplate(template_card, el)).join('');
            const output = template_overview.replace('{%PRODUCT_CARDS%}', cardsHtml);
            console.log(cardsHtml);
            
        // console.log(cardsHtml);       
        res.end(output);
    }

        //product
    else if (pathname === '/product'){
        console.log(query);
        
        res.writeHead(200, {
            'Content-type': 'text/html',

        })
        const product = dataObj[query.id];
        // console.log(product);
        
        const output = replaceTemplate(template_product, product);

        // console.log(query );
        res.end(output);
    }


            // API 
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
    }

            //not found
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
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

    

