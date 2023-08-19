const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // solution 1
  //   fs.readFile('./test-fil.txt', (err, data) => {
  //     if (err) throw err;
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(data);
  //   });

  // solution 2 stream
  // const readable = fs.createReadStream('./test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });

  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('file not found');
  // }); 
  // solution 3 
const readable = fs.createReadStream('./test-file.txt');
readable.pipe(res);
console.log(__dirname);

// readableSource.pipe(writeableDest);


});

server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
  });
