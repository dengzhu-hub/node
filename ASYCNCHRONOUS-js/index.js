const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();
const superagent = require('superagent');
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('oh, fatal error 😒');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('oh, fatal error 🤯');
      resolve('cound not find file');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);
    await writeFilePro('wirte-pro.txt', imgs.join('\n'));
    console.log('save the file by await');
  } catch (err) {
    console.log(err.message);
    throw (err)
  }
  return '2: READY';
};

( async () => {
  try {
    console.log('iief1');
    const x = await getDogPic();
    console.log(x);
    console.log('iief2');
    
  }catch (err) {
    console.log('err');
  }
    
    
   

})()

// getDogPic().then(x => {

//   console.log(x);
  
//   setImmediate(() => console.log('ImageLoader 2 finished'));
//   console.log('I\'m back');
// }).catch (err => {
//   console.log('error');
// });
process.nextTick(() => console.log('ImageLoader'));


/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('wirte-pro.txt', res.body.message);
  })
  .then(() => {
    console.log('save save.');
  })
  .catch(err => {
    console.log(err.message);
  });

// readFilePro(`${__dirname}/dog.txt`).then(data => {
//   console.log(`Breed:${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);
//       fs.writeFile('promise-dog.txt', res.body.message, 'utf8', err => {
//         if (err) return console.log(err.message);
//         console.log('save the promise file');
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });

*/

/*
fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
  //   console.log(data);
  //   superagent
  //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
  //     .end((err, res) => {
  //       if (err) return console.log(err.message);
  //       console.log(res.body.message);
  //       fs.writeFile('radom.txt', res.body.message, err => {
  //         console.log('save on the file');
  //       });
  //     });
  // use promise to save the
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res => {
      fs.writeFile('use-then_radom.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        console.log(res.body.message);

        console.log('save as the filed');
      });
    })
    .catch(err => {
      console.log(err.message);
    });
});
*/
