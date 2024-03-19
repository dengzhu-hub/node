const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log('Timer 1 finished'), 30);
setImmediate(() => console.log('ImageLoader 1 finished'));
process.nextTick(() => console.log('ImageLoaders-2'));
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

}
)


//   crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');

//   console.log(Date.now() - start, 'password encrypted');

//   crypto.pbkdf2(
//     'password',
//     'salt',
//     100000,
//     1024,
//     'sha512',
//     (err, derivedKey) => {
//       if (err) throw err;
//       console.log(Date.now() - start, 'password encrypted');
//     }
//   );
//   crypto.pbkdf2(
//     'password',
//     'salt',
//     100000,
//     1024,
//     'sha512',
//     (err, derivedKey) => {
//       if (err) throw err;
//       console.log(Date.now() - start, 'password encrypted');
//     }
//   );
//   crypto.pbkdf2(
//     'password',
//     'salt',
//     100000,
//     1024,
//     'sha512',
//     (err, derivedKey) => {
//       if (err) throw err;
//       console.log(Date.now() - start, 'password encrypted');
//     }
//   );
//   crypto.pbkdf2(
//     'password',
//     'salt',
//     100000,
//     1024,
//     'sha512',
//     (err, derivedKey) => {
//       if (err) throw err;
//       console.log(Date.now() - start, 'password encrypted');
//     }
//   );
//   // crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
//   // console.log(Date.now() - start, 'password encrypted');
//   // console.log(Date.now() - start, 'password encrypted');
//   // console.log(Date.now() - start, 'password encrypted');
// });
console.log('Hello from the top-level');

const randomBytes = crypto.randomBytes(16);
console.log('Random Bytes:', randomBytes.toString('hex'));


// // const data = 'Hello, world!';
// const hash = crypto.createHash('sha256').update(data).digest('base64');
// console.log(hash);
// // const crypto = require('crypto');

// 模拟一个存储用户数据的对象
// const usersDatabase = {};

// // 注册用户，存储密码的哈希值
// function registerUser(username, password) {
//     const salt = crypto.randomBytes(16).toString('hex'); // 生成一个随机的盐
//     const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//     usersDatabase[username] = { salt, hash };
//     console.log(`User ${username} registered.`);
// }

// 验证用户登录
function authenticateUser(username, password) {
    const user = usersDatabase[username];
    if (user) {
        const hash = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex');
        if (hash === user.hash) {
            console.log(`User ${username} authenticated.`);
        } else {
            console.log('Authentication failed. Invalid password.');
        }
    } else {
        console.log('User not found.');
    }
}

// 注册用户并验证登录
// registerUser('alice', 'securepassword');
// authenticateUser('alice', 'securepassword');  // 验证成功
// authenticateUser('alice', 'wrongpassword');   // 验证失败
