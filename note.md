#  NodeJs 笔记

###  readFileSync



```javascript
const read = fs.readFileSync('./txt/read-this.txt', 'utf-8');
console.log(read);

```

#### callback hell

* 接收两个参数(err, data)

* ```javascript
  
  // callback hell
  fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
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
  
  ```

  * 从最外面函数，一层一层的执行，读取文件。

  ### Install nvm

  * ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    
    # or
    
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```

  * 
  
  ### http server
  
  #### require 
  
  ```javascript
  const fs = require('fs');
  const http = require('http');
  const url = require('url');
  ```
  
  * 设置 statusCode
  *   res.setHeader('content-type', 'text/plain');
  * setHeader content-type :
    * text/html 这样就可以编写html语言
    * text/plain
  *  res.writeHead(404);

![image-20230324192230289](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202303241922440.png)

 * ```javascript
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
       
   ```

	#### overview 
	
	* 利用Json文件替代html网页。
	
	* 首相将html代码，利用占位符代替
	
	  ![image-20230328150018373](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202303281500539.png)
	
	* 代码
	
	  * ```javascript
	    const template_overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
	    const template_product = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
	    const template_card = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
	    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
	    const dataObj = JSON.parse(data);
	    ```
	
	  * 自己编写替代函数
	
	    * ```javascript
	      const replaceTemplate = function (temp, product) {
	          let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	           output = output.replace(/{%IMAGE%}/g, product.image);
	           output = output.replace(/{%NUTRIENTIS%}/g, product.nutrients);
	           output = output.replace(/{%QUANTITY%}/g, product.quantity);
	           output = output.replace(/{%PRICE%}/g, product.price);
	           output = output.replace(/{%FROM%}/g, product.from);
	           output = output.replace(/{%DESCRIPTION%}/g, product.description);
	           output = output.replace(/{%ID%}/g, product.id);
	           if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic ');
	           return output;
	          
	      }
	      ```
	
	      
	
	    * 调用函数
	
	    * ```javascript
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
	      ```
	
	    * 网页效果
	
	    * ![image-20230328150242437](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202303281502757.png)

#### product

* 利用url

  * ```
     const {query, pathname} = url.parse(req.url, true);
       console.log(pathname);
       
    ```

  * ![image-20230328150608223](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202303281506293.png)

* 利用query和pathname属性，进行如下操作

*  <a class="card__link" href="/product?id={%ID%}">
        <span>Detail <i class="emoji-right">👉</i></span>
      </a>

* ```javascript
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
  ```

* 

![image-20230328150759215](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202303281507402.png)

### nodejs modules

* Node.js 模块是 Node.js 程序组织代码的基本组成部分，是 Node.js 的核心功能之一。它允许开发人员将代码分解成多个小部分，每个部分都可以独立地开发、测试和维护。

  Node.js 的模块系统基于 CommonJS 规范，并通过 require() 函数加载和导出模块。模块可以是 Node.js 内置模块、第三方模块或自定义模块。

  在 Node.js 中，每个文件都被视为一个模块，文件路径就是模块的标识符。模块可以包含变量、函数和类等，可以通过 exports 对象或 module.exports 对象将它们导出给其他模块使用。导出的变量和函数可以在其他模块中使用 require() 函数进行引用和调用。

  Node.js 模块系统还提供了一些常用的内置模块，如 fs、http、os、path 等，它们提供了许多常用的功能和工具，可以方便地进行文件操作、网络通信、系统信息获取等操作。

  总的来说，Node.js 的模块系统为开发人员提供了一种方便、模块化的方式来组织代码，并使得 Node.js 应用程序更加易于开发、测试和维护。

### nodejs 参考文档

* Node.js 官方文档提供了非常丰富的 Node.js 相关信息和参考资料，以下是一些常用的参考文档：
  1. Node.js API 文档：https://nodejs.org/dist/latest/docs/api/ 该文档提供了 Node.js 核心模块的 API 参考，包括文件系统、网络、操作系统、加密等模块的具体用法和参数说明。
  2. NPM 文档：https://docs.npmjs.com/ 该文档提供了 npm（Node.js 包管理器）的使用说明，包括安装、更新、发布和管理 npm 包等内容。
  3. Express 文档：https://expressjs.com/ 该文档提供了 Express 框架的使用说明和 API 参考，包括路由、中间件、视图渲染等方面的内容。
  4. MongoDB 文档：https://docs.mongodb.com/ 该文档提供了 MongoDB 数据库的使用说明和 API 参考，包括数据建模、查询、聚合、索引等方面的内容。
  5. Socket.IO 文档：https://socket.io/docs/ 该文档提供了 Socket.IO 库的使用说明和 API 参考，包括实时通信、事件触发、房间管理等方面的内容。
  6. Cheerio 文档：https://cheerio.js.org/ 该文档提供了 Cheerio 库的使用说明和 API 参考，包括数据解析、文档操作、选择器查询等方面的内容。

  ### Nodejs modules
  
  * 在 Node.js 的早期版本中，JavaScript 的模块化是通过 CommonJS 规范来实现的，即使用 `require()` 和 `module.exports` 来导入和导出模块。但在 ES6 中，JavaScript 引入了原生的模块化支持，即 `import` 和 `export` 语句，使得 JavaScript 的模块化变得更加方便和直观。
  
    如果你的 Node.js 版本支持 ES6 的模块化（即 Node.js 12.0.0 及以上版本），你可以在 `package.json` 文件中设置 `"type": "module"`，来开启 ES6 的模块化支持。这样做的好处是可以使用 `import` 和 `export` 语句来导入和导出模块，而不需要再使用 `require()` 和 `module.exports`。
  
    要在 `package.json` 中开启 ES6 的模块化支持，只需要在文件中添加 `"type": "module"` 字段即可，如下所示：
  
    ```Json
    jsonCopy code{
      "name": "my-app",
      "version": "1.0.0",
      "type": "module",
      "dependencies": {
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
      }
    }
    ```
  
    注意，开启 ES6 的模块化支持后，你需要使用 `.js` 后缀名来引入模块，如 `import { someFunction } from './myModule.js'`。如果省略了 `.js` 后缀名，则 Node.js 会默认按照 CommonJS 规范来解析模块，导致出现错误。
  
* 调用modules

* 创建modules

  * ![image-20230328163136069](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202303281631154.png)

  * ```javascript
    const replaceTemplate = require('./modules/replaceTemplate');
    
    ```

##### npm

* npm init

* npm install slugify --save-dev

* 可选参数：

  * --save-dev  为开发者依赖

  * 不带参数，为普通依赖

  * ```Json
    "devDependencies": {
        "@types/node": "^18.15.6",
        "slugify": "^1.6.6"
      },
    
    
     "dependencies": {
        "slugify": "^1.6.6"
      }
    ```

  * 安装slugify包
  
    * ```json
      npm install slugify 
          "slugify": "^1.6.6"
      
      ```
  
    * 
  

#### 使用npm run 脚本代替，包命令

```
npm run start
```

![image-20230401093747927](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304010937011.png)

* 关于包的引用

  * ```javascript
    const slugify = require('slugify');
    ```

* 对于package的相关操作

* 包由三个数字组成 : "^1.6.6"

* 最后一个数字代表补丁版本，第二个代表次要版本，第一个是主要，代表重大更改

* 查看npm包哪些需要更新 npm outdated

* 安装指定版本 npm install packagename@1.0.1  数字按需取

* 如果你在原始版本上将^ 改为~就是过滤掉次要版本，就不会安装有次要版本的。

* npm update packagename@1.0.2

* 卸载包 npm uninstall package 

  ### 细节

  ##### 永远不要将node modules f分享出去

  ​	![image-20230401101348833](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304011013899.png)

  * 里面有成千上万个文件，只需要删除文件夹，然后别人只需要输入

    * ```json
      npm install
      ```

      即可自动安装所有依赖 

  ​	

  #### server htpp request
  
  ![image-20230404140505310](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041405549.png)

![image-20230404140925015](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041409177.png)

![image-20230404142003378](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041420641.png)

![](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041510932.png)

![image-20230404151355420](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041513621.png)![image-20230404153818195](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041538361.png)

![image-20230404152239746](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304041522961.png)

![IMG_1304(20230406-173030)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304061731839.JPG)

![IMG_1303(20230406-172802)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304061731904.JPG)

![IMG_1302(20230406-172223)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304061731938.JPG)

![IMG_1301(20230406-171742)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304061731957.JPG)

* setImmediate()在timmer之前执行
* nextTick()在Immediate()之前运行

* ```javascript
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
      'pas
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
    );sword',
      'salt',
      100000,
      1024,
      'sha512',
      (err, derivedKey) => {
        if (err) throw err;
        console.log(Date.now() - start, 'password encrypted');
      }
    );
  ```

* 阻塞线程模式

  * ```javascript
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
      console.log(Date.now() - start, 'password encrypted');
      crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
      console.log(Date.now() - start, 'password encrypted');
      crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
      console.log(Date.now() - start, 'password encrypted');
      crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
      console.log(Date.now() - start, 'password encrypted');
      crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
      console.log(Date.now() - start, 'password encrypted');
    ```

  * ![image-20230409090606504](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304090906631.png)

### THE EVENT-DRIVERN ARCHITECTURE

![IMG_1309(20230409-091134)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304090912279.JPG)

* event

  * ```javascript
    const EventEmitter = require('events');
    const http = require('http');
    class Sales extends EventEmitter {
      constructor() {
        super();
      }
    }
    const myEmitter = new Sales();
    
    myEmitter.on('myEvent', (data) => {
      console.log('Costumer name: Jonas');
    });
    myEmitter.on('myEvent', () => {
      console.log('There was a new event');
    });
    myEmitter.on('myEvent', (greet) => {
      console.log(`${greet}, jonas, welcome to my event`);
    });
    
    myEmitter.emit('myEvent', 'hello world');
    
    //////////////////////////////
    
    const server = http.createServer();
    server.on('request', (req, res) => {
      console.log('Request received');
      console.log(req.url);
      
      res.end('Request received');
    });
    server.on('request', (req, res) => {
     console.log('Another received 🏃‍♀️');
    });
    server.on('request', (req, res) => {
      console.log('yell received');
    });
    server.on('close', () => {
      console.log('Server closed');
    });
    
    server.listen(9000, '127.0.0.1', () => {
        console.log('Server listening on port 9000');
    })
    
    ```

  * ![image-20230409094337597](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304090943671.png)

##### Stream

* readable stream
* writeable stream
* duplex stream
* transform stream

![IMG_1310(20230409-095648)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304090957390.JPG)

* eg

  * ```javascript
      const readable = fs.createReadStream('./test-ile.txt');
      readable.on('data', (chunk) => {
        res.write(chunk);
      });
      readable.on('end', () => {
        res.end();
      });
      
      readable.on('error', (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end('file not found');
      }); 
      
    });
    
    server.listen(3000, '127.0.0.1', () => {
        console.log('Server running at http://127.0.0.1:3000/');
      });
    
    ```

  * ![image-20230412162340251](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304121623374.png)

正确运行

​	![image-20230412162521759](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304121625796.png)

![IMG_1322(20230412-173029)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304121829241.JPG)

![IMG_1321(20230412-171259)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304121829891.JPG)

![IMG_1320(20230412-171000)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304121829440.JPG)

![IMG_1319(20230412-170303)](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304121829809.JPG)

* warpper function

  * ```javascript
    console.log(require('module').wrapper);
    ```

    * ![image-20230423123908726](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304231239865.png)

* module.exports && exports

* ```javascript
  exports.add = function (a, b) {
      return a + b;
  }
  exports.sub = function (a, b) {
      return a - b;
  }
  exports.mul = function (a, b) {
      return a * b;
  }
  exports.div = function (a, b) {
      return a / b;
  }
  
  
  class Calculator {
      add(a, b)  {
          return a + b;
      }
      multiply(a, b) {
          return a * b;
      }
      subtract(a, b) {
          return a - b;
      }
      divide(a, b) {
          return a / b;
      }
  }
   module.exports =  Calculator;
  ```

* 

  * ```javascript
    const C = require('./test-module-1');
    
    const calclator = new C();
    
    console.log(calclator.add(1, 2));
    
    // exports 
    const {add, sub, div} = require('./test-module-2');
    
    console.log(add(1, 2));
    
    console.log(sub(1, 2));
    
    console.log(div(1, 2));
    
    ```

    **exports 可以直接利用ES6语法直接进行调用，因为require返回的世一个对象Object，比较方便**
    
    ```javascript
    const {add, sub, div} = require('./test-module-2');
    ```
    
    **caching**
    
    * ```javascript
      
      console.log('come form clicked');
      
      module.exports = () => console.log('hello world form test 🐎');
      //Test
      
      require('./test-module-3')();
      require('./test-module-3')();
      require('./test-module-3')();
      require('./test-module-3')();
      require('./test-module-3')();
       
      
      
      这个nodule智慧加载一次
      ```
    
    * ![image-20230423124245954](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304231242047.png)
    
    

#### ASYNCHRONOUS-JS

* superagent module

  * ```javascript
    const superagent = require('superagent');
    ```

* dog ceo API

  * ```
    https://dog.ceo/api/breed/${data}/images/random`)
    ```

  * ![image-20230423160749521](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304231607650.png)

* 通过callback function 从网上调用API查看图片吧地址保存在本地

* end()

  * ```javascript
    fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
      console.log(data);
      superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
          if (err) return console.log(err.message);
          console.log(res.body.message);
          fs.writeFile('radom.txt', res.body.message, err => {
            console.log('save on the file');
          });
        });
    });
    
    ```

    * ![image-20230423165751375](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304231657486.png)

* 利用promise解决

* 因为.get()方法返回一个promise

* .then()

  * ```javascript
    fs.readFile(`${__dirname}/dog.txt`, 'utf8', (data) => {
        console.log(data);
      superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
          //   if (err) return console.error(err.message);
          console.log(res.body.message);
          fs.writeFile('random-dog.txt', res.body.message, err => {
            if (err) return console.log(err.message);
            console.log('radom image');
          });
        })
        .catch(err => console.error(err.message));
    })
    
    ```

    

  * 当文件读取失误后

    * ```javascript
      .catch(err => console.error(err.message));  //通过catch捕捉
      ```

      * ![image-20230423160440449](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304231604550.png)

* 需要注意，每一个异步函数都会返回一个promise对象

  * 我们改写一下readFile || wirteFile，

    * ```javascript
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
      
      ```

    * ```javascript
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
      
      ```

    * 我们用async/await方式将上面程序改一下

      * ```javascript
        const getDogPic = async () => {
          try {
            const data = await readFilePro(`${__dirname}/dog.txt`);
            console.log(`Breed ${data}`);
            const res = await superagent.get(
              `https://dog.ceo/api/breed/${data}/images/random`
            );
        
            console.log(res.body.message);
            await writeFilePro('wirte-pro.txt', res.body.message);
            console.log('save the file by await');
          } catch (err) {
            console.log(err.message);
            throw (err)
          }
          return '2: READY';
        };
        // 注意我们用了try catch来捕获异常
        //我们用async/await让代码看着更加简洁，更加sync。
        ```

      * 如果要从上面这个异步函数中返回字符串，我们知道它是会返回一个promise的，那我们该怎么做呢

        * 用then()

          * ```javascript
             getDogPic().then(x => {
              
               console.log(x);
              
               setImmediate(() => console.log('ImageLoader 2 finished'));
               console.log('I\'m back');
             }).catch (err => {
               console.log('error');
             });
            ```

        * 我们还可以用IIEF语法

          * ```javascript
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
            //这样我们就可以不用then()
            ```

          * ![image-20230430113447476](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301134721.png)

* 同时处理多个promise

  * 修改之前代码

  * ```javascript
      const res1Pro = superagent.get(
          `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Pro = superagent.get(
          `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Pro = superagent.get(
          `https://dog.ceo/api/breed/${data}/images/random`
        );
    ```

* 使用promise.all()

  * ```javascript
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);
    ```



![IMG_1354](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301225729.PNG)

* Express是一个流行的Node.js框架，用于构建Web应用程序和API。它提供了一组简洁而灵活的工具和中间件，使开发者能够快速构建可扩展的服务器端应用。

  以下是一些使用Express的原因：

  1. 简洁而灵活：Express提供了一组简单而灵活的API，使开发者能够轻松地处理HTTP请求和响应。它没有过多的抽象层，使开发者可以更自由地构建应用程序的各个部分。
  2. 中间件支持：Express的中间件机制使开发者能够将功能模块化，并以可重用的方式应用于应用程序中的不同路由。这样可以简化代码的组织和维护，并提高开发效率。
  3. 路由处理：Express提供了简单而强大的路由功能，使开发者能够定义不同URL路径的处理程序。这样可以将请求分发到不同的处理器函数中，从而实现灵活的路由控制。
  4. 中间件生态系统：Express拥有一个庞大的中间件生态系统，提供了各种功能，如身份验证、会话管理、日志记录等。这些中间件可以轻松地集成到应用程序中，从而加快开发速度。
  5. 社区支持和文档丰富：Express拥有庞大而活跃的开发者社区，提供了大量的文档、教程和示例代码。这使得学习和解决问题变得更加容易。

### mvc

MVC架构（Model-View-Controller，模型-视图-控制器）是一种软件设计模式，用于组织和管理应用程序的代码结构。它将应用程序分为三个主要部分，每个部分负责不同的任务和功能：

1. 模型（Model）：模型表示应用程序的数据和业务逻辑。它负责处理数据的获取、存储、验证和处理。模型通常包含数据库操作、数据结构、业务规则和算法等。
2. 视图（View）：视图负责向用户展示数据并接收用户的输入。它是应用程序的用户界面，可以是网页、图形界面、命令行界面等。视图通常是根据模型的数据来生成并呈现给用户。
3. 控制器（Controller）：控制器作为模型和视图之间的协调者，负责处理用户的输入并更新模型和视图。它接收用户的请求，调用适当的模型方法来处理请求，然后将更新后的数据发送给适当的视图进行显示。

MVC的目标是将应用程序的逻辑和数据分离，使其更易于维护和扩展。通过将不同的功能和职责分配给不同的组件，MVC使代码更具可读性、可重用性和可测试性。此外，MVC还支持并发开发，因为不同的开发人员可以同时工作在模型、视图和控制器的不同部分上。

#### express study

* require

  * ```javascript
    const express = require('express');
    const app = express();
    const port = 999;
    
    ```

* 创建路由

  * get

    * ```javascript
      app.get('/', (req, res) => {
        res.set({
          'Content-Type': 'application/json',
          ETag: '12345',
        });
        res.status(500).json({ error: 'message' , message: 'hello from her to world, express!'});
      //   res.status(200).send('hello world');
        // res.status(404).sendFile('D:/Study/Git/nodejs/eexpress-code/public/img/404.webp');
      });
      
      ```

  * post

    * ```javascript
      app.post('/', (req, res) => {
          res.set({
              'Content-Type': 'application/json',
              ETag: '12345',
      
          })
          res.status(200).send({message: 'hello from her to world, express, why not from her'})
      })
      
      ```

    * 

  * 启动服务

    * ```javascript
      app.listen(port, () => {
        console.log(`server runing at http://localhost:${port}`);
      });
      
      ```

  * 测试

    * ![image-20230430134947590](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301349966.png)
    * ![image-20230430135026114](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301350299.png)
    * ![image-20230430135045853](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301350161.png)

* 更多请见： http://expressjs.com/en/api.html#app.post.method
  * ![image-20230430135145561](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301351788.png)



#### API

* API是应用程序编程接口（Application Programming Interface）的缩写。它是一组定义了软件组件之间交互的规则和协议，允许不同的软件应用程序之间进行通信和数据交换。

  API可以被视为一座桥梁，它允许不同的软件系统之间进行交互，共享数据和功能。通过API，开发人员可以访问和使用其他软件、服务或库提供的功能和数据，而无需了解其内部实现细节。

  API可以采用不同的形式，包括：

  1. 基于函数调用的API：开发人员通过调用特定的函数来使用其他软件组件提供的功能和服务。
  2. 基于类和方法的API：使用面向对象编程的语言，API提供了一组类和方法，开发人员可以通过实例化对象和调用方法来使用所需的功能。
  3. Web API：基于网络协议（如HTTP）的API，通过HTTP请求和响应来实现不同应用程序之间的通信和数据交换。RESTful API就是一种常见的Web API设计风格。

  API的好处包括：

  - 代码复用：通过使用API，开发人员可以利用其他软件组件的功能，避免从头开始编写重复的代码。
  - 模块化和解耦：API将软件系统拆分为模块，通过定义清晰的接口，使不同模块之间的依赖关系更加清晰和可管理。
  - 提高开发效率：API提供了高级别的抽象和封装，使开发人员能够更快地构建应用程序，无需关注底层实现细节。
  - 促进合作：API允许不同的开发人员或团队共同开发和集成不同的软件组件，促进了合作和集成。

![IMG_1356](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301410641.PNG)

![IMG_1357](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301411060.PNG)

* RESTful API（Representational State Transfer，表述性状态转移）是一种设计风格和约束条件，用于构建可扩展的网络服务和API。它是基于HTTP协议的一种架构风格，旨在使网络应用程序之间的通信更加简单、可靠和可扩展。

  * 以下是RESTful API的一些关键特点和解释：

    1. 资源（Resources）：在RESTful API中，每个数据实体都被视为一个资源，通过唯一的标识符（通常是URL）来访问。资源可以是物理对象、数据库记录、文件等。
    2. 统一接口（Uniform Interface）：RESTful API提供了一组统一的操作接口，包括使用HTTP动词（GET、POST、PUT、DELETE等）对资源进行操作，以及使用HTTP状态码（如200 OK、404 Not Found）表示操作的结果。
    3. 无状态（Stateless）：RESTful API不维护客户端的状态信息，每个请求都应该包含足够的信息以便服务器理解和处理。这样可以使服务更具可伸缩性，因为服务器不需要保存客户端的状态。
    4. 按需数据传输（Representation）：客户端和服务器之间的数据传输是基于资源的表述，可以使用不同的数据格式（如JSON、XML）进行编码和解码。客户端可以根据需要请求所需的资源表述，服务器返回相应的数据。
    5. 超媒体驱动（HATEOAS）：RESTful API可以使用超媒体链接来提供与资源相关的其他操作和资源。服务器可以在响应中包含链接，客户端可以根据这些链接进行进一步的操作，使应用程序具有更好的可发现性和自我描述性。

    使用RESTful API的好处包括可扩展性、松耦合性、易于缓存和无限制的客户端和服务器的实现选择。它已成为构建现代Web服务和移动应用程序的常用架构风格。

    ![IMG_1359](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301412938.PNG)

![IMG_1360](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301414612.PNG)

![IMG_1361](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301414296.PNG)

* build our own api

  * 读取json文件

    * ```
      const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
      
      ```

    * Get

  * ```
    app.get('/api/v1/tours', (req, res) => {
        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                tours
            }
        })
    
    
    })
    ```

* 从网上抓取API

  * ```
    npm i axios
    ```

  * ```javascript
    (async () => {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/todos'); // 替换为你要抓取的API的URL
          const data = response.data; // 获取响应数据
          // 在这里对数据进行处理或保存到变量
          fs.writeFileSync(`${__dirname}/dev-data/data/todo.json`, JSON.stringify(data));
         
         console.log('Data saved to api.json file');
         process.exit(); 
          
        } catch (error) {
          console.error(error);
          process.exit(1);
        }
        
      })()
    
    ```

  * postman test

    * ![image-20230430160854063](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301608364.png)

* post
  * dsad
  * 当我没填写任何参数时，直接发送post
    * ![image-20230430161624880](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301616063.png)
    * 然后去看控制台，发现是空的
      * ![image-20230430161659765](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301616973.png)

*  我加了参数重写post

  * ![image-20230430161840332](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301618552.png)

  * 可以看到有数据
    * ![image-20230430161900815](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301619012.png)

* 如果我没有定义这句

  * ```
    app.use(express.json())
    ```

  * 返回的数据会undefined

    * ![image-20230430162031527](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301620757.png)

* 使用post创建tour

  * ```javascript
      const newId = tours[tours.length - 1].id + 1;
      const newTour = Object.assign({ id: newId }, req.body);
      tours.push(newTour);
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
          res.json({
            status: 'success',
            data: {
              tour: newTour,
            },
          });
        }
      );
    ```

* send用post

  * ![image-20230430165154975](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301651265.png)

* 用get查看

  * ![image-20230430165225231](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202304301652463.png)

* 我想说的是 req.body
  * 就是我们用postman提交时，body区域书写的内容
* 我们每一次的post或get都会去更新服务，因为会去读取文件json文件



* 传递参数

  * ```javascript
    app.get('/api/v1/tours/:id', (req, res) => {
      console.dir(req.params);
      res.status(200).json({
        status: 'success',
      })
    })
    // 我们只需将url后面用:id    :id--- 变量名，如果后面跟多个变量名， :id/:x/:y
    //如果想要参数变得可选  :y?  只需要在变量名后面跟?即可。
    //类似url：http://localhost:999/api/v1/tours/5/jack
    ```

    * ![image-20230502112354611](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021123747.png)

  * 我们从新修改代码，值传递id

    * ```javascript
        const id = req.params.id * 1;
        const tour = tours.find(el => el.id === id);
        console.dir(req.params);
        res.status(200).json({
          status: 'success',
          data: {
            tour
          }
        })
      ```

      * ![image-20230502113938053](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021139174.png)

* patch()

  * ```javascript
    app.patch('/api/v1/tours/:id', (req, res) => {
      if (req.params.id > tours.length)
        return res.status(404).json({
          status: 'error',
          messgae: 'something went wrong'
        })
      res.status(200).json({
        status: 'success',
        data: '<updated the tour...>'
    
      })
    }
    )
    ```

  * ![image-20230502122109530](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021221708.png)

* delete()

  * ```JavaScript
      if (req.params.id > tours.length)
      return res.status(404).json({
        status: 'error',
        messgae: 'something went wrong'
      })
    res.status(204).json({
      status: 'success',
      data: null
    ```

    * ![image-20230502122355880](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021223955.png)

* 重构我的代码

  * ```javascript
    const getAllTours = (req, res) => {
      res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
          tours,
        },
      });
    };
    
    const getTour = (req, res) => {
      const id = req.params['id'] * 1;
      // if (id > tours.length)
      const tour = tours.find((el) => el.id === id);
      if (!tour)
        return res
          .status(404)
          .sendFile('D:/Study/Git/nodejs/eexpress-code/public/img/404.webp');
      console.dir(req.params);
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    };
    
    const createTour = (req, res) => {
      // console.log(req.body);
      const newId = tours[tours.length - 1].id + 1;
      const newTour = Object.assign({ id: newId }, req.body);
      tours.push(newTour);
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
          res.json({
            status: 'success',
            data: {
              tour: newTour,
            },
          });
        }
      );
    };
    const updateTour = (req, res) => {
      if (req.params.id > tours.length)
        return res.status(404).json({
          status: 'error',
          messgae: 'something went wrong',
        });
      res.status(200).json({
        status: 'success',
        data: '<updated the tour...>',
      });
    };
    
    const deleteTour = (req, res) => {
      if (req.params.id > tours.length)
        return res.status(404).json({
          status: 'error',
          messgae: 'something went wrong',
        });
      res.status(204).json({
        status: 'success',
        data: null,
      });
    };
    
    ```

  * ```JavaScript
    
    app.get('/api/v1/tours', getAllTours);
    // pass params
    
    app.get('/api/v1/tours/:id/', getTour);
    
    app.post('/api/v1/tours', createTour);
    
    // patch
    app.patch('/api/v1/tours/:id', updateTour);
    app.delete('/api/v1/tours/:id', deleteTour);
    ```

  * 让他变得更好 app.route()

    我们可以使用app.route()来调用多个请求method 这样就很方便了
    
    * ```javascript
      app.route('/api/v1/tours').get(getAllTours).post(createTour);
      app
        .route('/api/v1/tours/:id')
        .get(getTour)
        .patch(updateTour)
        .delete(deleteTour);
      ```



### middleware

everything is middleware

Express 是一个路由和中间件 Web 框架，它自己的功能很少：Express 应用程序本质上是一系列中间件函数调用。

*中间件*函数是可以访问[请求对象](https://expressjs.com/en/4x/api.html#req)( `req`)、[响应对象](https://expressjs.com/en/4x/api.html#res)( `res`) 和应用程序请求-响应周期中的下一个中间件函数的函数。下一个中间件函数通常由一个名为 的变量表示`next`。

中间件函数可以执行以下任务：

- 执行任何代码。
- 更改请求和响应对象。
- 结束请求-响应循环。
- 调用堆栈中的下一个中间件函数。

如果当前中间件函数没有结束请求-响应循环，它必须调用`next()`将控制权传递给下一个中间件函数。否则，请求将被挂起。

Express 应用程序可以使用以下类型的中间件：

- [应用层中间件](https://expressjs.com/en/guide/using-middleware.html#middleware.application)
- [路由器级中间件](https://expressjs.com/en/guide/using-middleware.html#middleware.router)
- [错误处理中间件](https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling)
- [内置中间件](https://expressjs.com/en/guide/using-middleware.html#middleware.built-in)
- [第三方中间件](https://expressjs.com/en/guide/using-middleware.html#middleware.third-party)

![image-20231123114548469](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202311231145158.png)

您可以使用可选的安装路径加载应用程序级和路由器级中间件。您还可以一起加载一系列中间件功能，这会在挂载点创建中间件系统的子堆栈。

* eg

  * ```javascript
    app.use('/api/v1/tours/:id', (req, res, next) => {
      console.log('hello form here!');
      next();
      
    })
    ```

    * ![image-20230502141944098](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021419201.png)

  * 当你吧middleware放在app.get后面时，它是不会运行的，因为前面的相应已经完成了，所以这个路由已经结束了

  * **中间件功能是按顺序执行的，因此中间件包含的顺序很重要。**

* 获取时间的中间件

  * ```javascript
    app.use((req, res, next) => {
      req.requestTime = new Date().toISOString();
      next();
    })
    
    
    // 我因为失误，没有写next(),所以当我调用get()时，我的程序一直运行不出来，是因为程序没有next()就会被一直挂着
    ```

  * 为了测试我注释掉了next(),他就一直处于sending request状态

  * ```javascript
    app.use((req, res, next) => {
      console.log('my name is middleware');
      // next();
    });
    ```
    
  * ![image-20231123115441467](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202311231154845.png)

  * 成功调用

    

    * 
    * ![image-20230502143252581](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021432633.png)

* 我们也可以定义自己全局变量在middleware中

* ```javascript

  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });
  ```

* 然后在需要的地方使用 至需要调用 req.就可以了，并且是全局的

* ```javascript
  const getTourById = (req, res) => {
    // 根据请求路径中的id获取旅游信息
    const { id } = req.params;
    const requestAt = req.requestTime;
    // 如果id在tours数组中找到对应的旅游信息
    if (tours.find((tour) => tour.id === Number(id))) {
      // 返回成功响应并返回相应的数据
      res.status(200).json({
        status: 'success',
        requestAt,
        data: {
          tour: tours.find((tour) => tour.id === Number(id)),
        },
        createAt: new Date(),
      });
    } else {
  ```

* 这样确实很方便

* ![image-20231123120615339](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202311231206466.png)

* morgan一个很好的logger

  * ```javascript
    npm i morgan
    const morgan = require('morgan');
    app.use(morgan('dev'));
    ```

  * output

    * ```javascript
      GET /api/v1/tours 200 6.010 ms - 8552
      GET /api/v1/tours/543 404 7.283 ms - 51502
      
      ```

* 他还有很多输出，具体参见

  * http://expressjs.com/en/resources/middleware/body-parser.html



##### user route

* 创建用户的route

  * ```javascript
    app.route('/api/v1/users').get(getAllUsers).post(createUser);
    app.route('/api/v1/user').get(getUser).patch(updateUser).delete(deleteUser);
    
    ```

* 函数定义

  * ```javascript
    //随便举一个例子
    const deleteUser = (req, res) => {
      if (req.params.id > users.length)
        return res.status(404).json({
          status: 'error',
          messgae: 'something went wrong',
        });
      res.status(204).json({
        status: 'success',
        data: null,
      });
    };
    
    ```



##### mounting multiple route

```javascript
const toRouter = express.ROUTER()
```

调用

* ```javascript
  app.use('/api/v1/tours', toRouter);
  toRouter.route('/').get(getAllTours).post(createTour);
  
  toRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
  
  ```

### complete refactor our forder

* 先创建目录

  * ![image-20230502163545738](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021635807.png)

* 将文件重构

  * ```javascript
    const express = require('express');
    const router = express.Router();
    const fs = require('fs');
    
    const users = JSON.parse(
      fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
    );
    const getAllUsers = (req, res) => {
      res.status(200).json({
        status: 'success',
        requestT: req.requestTime,
        result: users.length,
        data: {
          users,
        },
      });
    };
    
    ```

* app.js引入

  * ```javascript
    const toRouter = require('./routes/tourRouter');
    const userRouter = require('./routes/userRouter');
    
    
    ```

* controllers

  * ![image-20230502170330173](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305021703252.png)

  * ```javascript
    const fs = require('fs');
    const tours = JSON.parse(
      fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
    );
    exports.getAllTours = (req, res) => {
      res.status(200).json({
        status: 'success',
        result: tours.length,
        requestAt: req.requestTime,
        data: {
          tours,
        },
      });
    };
    exports.getTour = (req, res) => {
      const id = req.params['id'] * 1;
      // if (id > tours.length)
      const tour = tours.find((el) => el.id === id);
      if (!tour)
        return res
          .status(404)
          .sendFile('D:/Study/Git/nodejs/eexpress-code/public/img/404.webp');
      console.dir(req.params);
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    };
    ```

  * 导入

    * ```javascript
      const express = require('express');
      const router = express.Router();
      const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('../controllers/tourControllers')
      
        router.route('/').get(getAllTours).post(createTour);
      
      router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
      
      
      ```

  * params

  * > ```javascript
    > router.param('id', checkId);
    > 
    > exports.checkId = (req, res, next, val) => {
    >   console.log(`the id is ${val}`);
    > 
    >   if (val > tours.length)
    >     return res.status(404).json({
    >       status: 'error',
    >       messgae: 'something went wrong',
    >     });
    >   next();
    > };
    > ```
    >
    > 当我们这样定义params时，我们取发送一个包含参数时他会在控制台输出：
    >
    >  the id is 4
    > { id: '4' }
    >
    > 反之不请求有id参数时，什么都不会显示
  
  * 创建server.js用于启动服务
  
    * ```javascript
      const app = require('./app');
      const port = 999;
      
      app.listen(port, () => {
          console.log(`server runing at http://localhost:${port}`);
        });
        
      ```
  
  * 修改package.json
  
    * ```Json
        "scripts": {
          "start": "nodemon server.js"
        },
      ```
  
        * chaining multiple middleware function
        
        * > ```javascript
          > exports.checkBody = (req, res, next) => {
          >   if (!req.body.name || !req.body.price) {
          >     return res.status(400).json({
          >       status: 'fail',
          >       message: 'missing name or price',
          >     });
          >   }
          > 
          >   next();
          > };
          > 
          > router.route('/').get(getAllTours).post(checkBody, createTour);
          > ```
          >
          > 在post之前，检查是否包含name price property

利用express访问静态文件

```javascript
app.use(express.static(`${__dirname}/public`));
```

在浏览器输入：http://localhost:999/tour.html

这时http://localhost:999就相当于public

![image-20230519113257899](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305191132048.png)

我们可以使用app.get('env') 访问我们的环境是什么

![image-20231124090442026](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202311240904275.png)

配置nodejs的环境变量

* 在根目录下创建config.env 文件

* > ```json
  > NODE_ENV=development
  > DB_HOST=localhost
  > PORT=9999
  > USERNAME=root
  > PASSWORD=2001asdf
  > ```
  >
  > 导入npm i dotenv
  >
  > ```javascript
  > const dotenv = require('dotenv');
  > dotenv.config({ path: './config.env' }); //他只会配置一次，就可以在其他文件使用
  > ```
  >
  > ```javascript
  > const dbHost = process.env.DB_HOST;
  > console.log(dbHost); // 输出：localhost
  > const user = process.env.USERNAME;
  > console.log(user);
  > ```
  >
  > 在其他文件使用
  >
  > ```javascript
  > if (process.env.NODE_ENV === 'development') {
  >   app.use(morgan('dev'));
  > }
  > //判断是否为development，才输出morgan格式的
  > //GET /api/v1/tours/4 200 10.618 ms - 983
  > 
  > //像这样
  > const port = process.env.PORT || 999
  > app.listen(port, () => {
  >   console.log(`server runing at http://localhost:${port}`);
  > });
  > 
  > ```
  >
  > 

#### EsLint + prettier

```Json
npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D
```

效果：

![image-20230519144631846](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305191446954.png)

但是你可以运行，就是给你说你写的不规范

```Json
 "devDependencies": {
    "eslint": "^8.40.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-react": "^7.32.2",
    "prettier": "^2.8.8"
  }
```



![image-20231124102134628](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202311241021431.png)

# MongoDB

![IMG_1378](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305191448974.PNG)

MongoDB是一种开源的NoSQL数据库管理系统，它使用文档模型来存储和处理数据。下面是MongoDB的一些详细解释：

1. NoSQL数据库：MongoDB是一种NoSQL（非关系型数据库）系统，与传统的关系型数据库不同，它不使用表格和行的结构来存储数据。相反，MongoDB使用文档的概念，文档是一种灵活的数据结构，可以容纳不同类型的数据，并且可以嵌套其他文档和数组。
2. 文档模型：MongoDB使用文档模型来组织数据。文档是一组键值对的集合，类似于关系型数据库中的行，但更加灵活。文档可以包含任意数量和类型的字段，每个字段可以是不同的数据类型，例如字符串、整数、日期、数组等。这种灵活性使得MongoDB适合存储半结构化和非结构化数据。
3. 分布式架构：MongoDB被设计为在大规模分布式环境中运行。它支持水平扩展，可以在多台服务器上分布数据，以提供更好的性能和容错能力。通过将数据分片存储在不同的服务器上，MongoDB可以处理大量的读写请求，并提供高可用性和横向扩展的能力。
4. 查询语言：MongoDB使用类似于JavaScript的查询语言来检索和操作数据。这种查询语言支持丰富的查询操作，包括等值匹配、范围查询、正则表达式、聚合管道等。它还支持地理空间查询，以便在地理位置数据中执行位置相关的操作。
5. 高性能：MongoDB采用了多种技术来提供高性能的数据访问。它使用内存映射文件来提供快速的读取操作，利用索引来加速查询，并使用复制和故障转移机制来提供高可用性和数据冗余。
6. 扩展性：MongoDB可以根据应用程序的需求进行水平扩展。通过添加更多的服务器和分片数据，可以增加系统的处理能力和存储容量。这种扩展性使得MongoDB非常适合应对数据量增长和高负载的情况。
7. 多功能性：除了基本的数据存储和查询功能外，MongoDB还提供了其他高级功能。它支持索引、事务、复制、故障恢复、地理空间索引和查询、全文搜索等。这些功能使得MongoDB可以满足各种应用程序的需求。

总之，MongoDB是一种灵活、可扩展和高性能的NoSQL数据库系统，适用于存储和处理各种类型的数据。

![image-20231124102123042](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202311241021321.png)

以下是一些MongoDB的语句案例：

1. 插入文档：

   ```
   phpCopy code
   db.collection.insertOne({ field1: value1, field2: value2, ... })
   ```

   ```
   phpCopy code
   db.collection.insertMany([{ field1: value1, field2: value2 }, { field1: value3, field2: value4 }])
   ```

2. 查询文档：

   ```
   cssCopy code
   db.collection.find({ field: value })
   ```

   ```
   cssCopy code
   db.collection.find({ field: { $gt: value } })
   ```

3. 更新文档：

   ```
   cssCopy code
   db.collection.updateOne({ field: value }, { $set: { fieldToUpdate: newValue } })
   ```

   ```
   cssCopy code
   db.collection.updateMany({ field: value }, { $inc: { fieldToIncrement: incrementValue } })
   ```

4. 删除文档：

   ```
   cssCopy code
   db.collection.deleteOne({ field: value })
   ```

   ```
   cssCopy code
   db.collection.deleteMany({ field: value })
   ```

5. 聚合操作：

   ```
   phpCopy code
   db.collection.aggregate([{ $match: { field: value } }, { $group: { _id: "$field", count: { $sum: 1 } } }])
   ```

6. 创建索引：

   ```
   cssCopy code
   db.collection.createIndex({ field: 1 })
   ```

7. 开启事务：

   ```
   scssCopy codesession = db.getMongo().startSession()
   session.startTransaction()
   ```

这些只是MongoDB的一些基本操作示例，实际使用中还有更多高级的查询、索引、聚合和事务操作可供选择。

![IMG_1379](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305191503348.PNG)

![IMG_1381](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202305191506531.PNG)

* 插入数据

* > ```json
  > natours-test> db.tours.insertOne({"name": "The Foreset Hiker", "paice": 545, "rating": 5.6})
  > {
  >   acknowledged: true,
  >   insertedId: ObjectId("646736031585e6cf8295d49c")
  > }
  > ```

* 查询

  * > ```json
    > natours-test> db.tours.find()
    > [
    >   {
    >     _id: ObjectId("646736031585e6cf8295d49c"),
    >     name: 'The Foreset Hiker',
    >     paice: 545,
    >     rating: 5.6
    >   }
    > ]
    > ```

  * ```Json
    natours-test>  show dbs
    admin          40.00 KiB
    config        108.00 KiB
    local          40.00 KiB
    natours-test   88.00 KiB
    ```

  * ```Json
    natours-test> db.tours.find({price: {$lte: 500}, rating:{$gte: 5.2}
    })
    [
      {
        _id: ObjectId("646738991585e6cf8295d49d"),
        name: 'The Sea Explorer',
        price: 257,
        rating: 5.6
      }
    ]
    ```

  * ```Json
    OR
    
    natours-test> db.tours.find({$or: [{price: {$lt: 500}}, {rating: {$gt:5.4}}]})
    [
      {
        _id: ObjectId("646736031585e6cf8295d49c"),
        name: 'The Foreset Hiker',
        paice: 545,
        rating: 5.6
      },
      {
        _id: ObjectId("646738991585e6cf8295d49d"),
        name: 'The Sea Explorer',
        price: 257,
        rating: 5.6
      },
      {
        _id: ObjectId("646738991585e6cf8295d49e"),
        name: 'The Snow Adventure',
        price: 567,
        rating: 5.6,
        difficulty: 'easy'
      }
    ]
    
    
    只输出一条数据 
    natours-test> db.test_natours.find({$or:[{price:{$gte:700}}, {rating:{$eq:19}}]}, {price:1})
    [
      { _id: ObjectId("6560124a98009364121dd642"), price: 988 },
      { _id: ObjectId("656012d198009364121dd643"), price: 876 },
      { _id: ObjectId("656012d198009364121dd644"), price: 4344 }
    ]
    ```
    
  * ```Json
    natours-test> db.tours.find({$and: [{price: {$lt: 500}}, {rating: {$gt:5.4}}]})
    [
      {
        _id: ObjectId("646738991585e6cf8295d49d"),
        name: 'The Sea Explorer',
        price: 257,
        rating: 5.6
      }
    ]
    ```
  
  * use name
  
  * ```json
    natours-test> db.tours.find({$or:[{price:{$gt:500}},{rating:{$gt:5.4}}]}, {name:1})
    [
      {
        _id: ObjectId("646736031585e6cf8295d49c"),
        name: 'The Foreset Hiker'
      },
      {
        _id: ObjectId("646738991585e6cf8295d49d"),
        name: 'The Sea Explorer'
      },
      {
        _id: ObjectId("646738991585e6cf8295d49e"),
        name: 'The Snow Adventure'
      }
    ]
    ```

#### update document

```json
natours-test> db.tours.updateOne({"name": "The Summer Sea"},{$set:{"price": 1980}})
```

```Json
natours-test> db.tours.updateOne({price:{$gt:600},rating:{$gte:4.7}},{$set:{"premium":
 true}})
```

#### delete

```json
natours-test> db.tours.deleteOne({name:"The Summer Sea"})
{ acknowledged: true, deletedCount: 1 }
```



#### 远程连接数据库

![image-20230601175114694](https://makeforpicgo.oss-cn-chengdu.aliyuncs.com/study/202306011751975.png)

#### app 使用mongodb

![image-20240317160031767](https://jonasforjack.oss-cn-chengdu.aliyuncs.com/jonas/image-20240317160031767.png)

```javascript
npm i mongoose 

DATABASE=mongodb+srv://jonas:<password>@cluster0.o9dsiml.mongodb.net/natours?retryWrites=true&w=majority


```

```javascript
mongoose.
connect(DB_HOST, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: false,
}).then((con) => {
  console.log(con.connections);
  console.log('DB connection established');

});
```

创建schema

```javascript
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: true,
  },
  price: {
    type: String,
    required: [true, 'A tour must have a price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});
```

![image-20240318193126273](https://jonasforjack.oss-cn-chengdu.aliyuncs.com/jonas/image-20240318193126273.png)

[关注点分离](https://www.geeksforgeeks.org/mvc-framework-introduction/)


MVC 架构是一种常用的软件架构模式，用于组织和管理应用程序的代码。它将应用程序分为三个核心组件：

1. **Model（模型）**：
   - 模型代表应用程序的数据和业务逻辑。
   - 负责管理应用程序的数据状态，处理数据的读取、更新和删除操作。
   - 定义了应用程序的业务规则和逻辑。
2. **View（视图）**：
   - 视图是用户界面的表示层。
   - 负责展示模型的数据给用户，并接受用户的输入。
   - 通常是用户与应用程序交互的界面，负责呈现数据给用户，并接受用户的操作和输入。
3. **Controller（控制器）**：
   - 控制器是模型和视图之间的中间人。
   - 负责处理用户的请求，并相应地更新模型或视图。
     - 接收用户的输入，根据用户的请求调用相应的模型逻辑来处理数据，并将处理结果传递给视图进行展示。

![image-20240318194738943](https://jonasforjack.oss-cn-chengdu.aliyuncs.com/jonas/image-20240318194738943.png)

![image-20240318195541827](C:\Users\jackdeng\AppData\Roaming\Typora\typora-user-images\image-20240318195541827.png)

![image-20240319135328438](https://jonasforjack.oss-cn-chengdu.aliyuncs.com/jonas/image-20240319135328438.png)
