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
