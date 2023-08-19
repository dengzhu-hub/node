const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;



setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('ImageLoader 1 finished'));
fs.readFile('./test-file.txt', 'utf8', (err, data) => {
  console.log('I/O finished');
  console.log('-----------');
  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Timer 3 finished'), 3000);
  setImmediate(() => console.log('ImageLoader 2 finished'));
  process.nextTick(() => console.log('ImageLoader'));
  crypto.pbkdf2(
    'password',
    'salt',
    100000,
    1024,
    'sha512',
    (err, derivedKey) => {
      if (err) throw err;
      console.log(Date.now() - start, 'password encrypted');
    }
  );
  crypto.pbkdf2Sync(
    'password',
    'salt',
    100000,
    1024,
    'sha512');
   
      console.log(Date.now() - start, 'password encrypted');
   
  
  crypto.pbkdf2(
    'password',
    'salt',
    100000,
    1024,
    'sha512',
    (err, derivedKey) => {
      if (err) throw err;
      console.log(Date.now() - start, 'password encrypted');
    }
  );
  crypto.pbkdf2(
    'password',
    'salt',
    100000,
    1024,
    'sha512',
    (err, derivedKey) => {
      if (err) throw err;
      console.log(Date.now() - start, 'password encrypted');
    }
  );
  crypto.pbkdf2(
    'password',
    'salt',
    100000,
    1024,
    'sha512',
    (err, derivedKey) => {
      if (err) throw err;
      console.log(Date.now() - start, 'password encrypted');
    }
  );
  crypto.pbkdf2(
    'password',
    'salt',
    100000,
    1024,
    'sha512',
    (err, derivedKey) => {
      if (err) throw err;
      console.log(Date.now() - start, 'password encrypted');
    }
  );
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'password encrypted');
  console.log(Date.now() - start, 'password encrypted');
  console.log(Date.now() - start, 'password encrypted');
});
console.log('Hello from the top-level');
