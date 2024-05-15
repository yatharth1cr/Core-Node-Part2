## BLOCK-writeCode

#### Path

Q. Suppose we have 3 files inside a directory on desktop
The structure is

- node(folder) - app.js - server.js - index.html
  You are currently inside server.js

Write code to

- capture absolute path of `server.js`(itself)
- get absolute path of `app.js`
- get realtive path of `index.html`
- get absolute path of `index.html` using `path module`

```js
// Capture absolute path of server.js (itself)
const serverPath = __filename;
console.log(serverPath);

const path = require("path");

// Get absolute path of app.js
const appPath = path.join(__dirname, "app.js");
console.log(appPath);

// Get relative path of index.html
const indexPath = "index.html";
console.log(indexPath);

// Get absolute path of index.html using path module
const absoluteIndexPath = path.join(__dirname, indexPath);
console.log(absoluteIndexPath);
```

#### Capture data on server

Q. Create a server using http

- handle post method on '/' route
- send json data on it from postman

```js
// data format is
{
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul'
}
```

- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.

```js
const http = require("http");

const port = 3000;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  // Listen for data chunks
  req.on("data", (chunk) => {
    store += chunk;
  });

  // Once all data received
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/") {
      // Set the appropriate response headers
      res.writeHead(201, { "Content-Type": "application/json" });
      // Send the captured data back in the response
      res.write(store);
    }
    // End the response
    res.end();
  });
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

Q. Follow above steps with form data from postman instead of json data.

- once data has been captured, send only captain's name in response.

```js
const http = require("http");
const qs = require("querystring");

function handleRequest(req, res) {
  let store = "";
  req
    .on("data", (chunk) => {
      store += chunk;
    })
    .on("end", () => {
      if (req.method === "POST" && req.url === "/") {
        var parsedData = qs.parse(store);
        res.writeHead(201, { "Content-Type": "Text/plain" });
        res.write(parsedData.captain);
      }
      res.end();
    });
}

const server = http.createServer(handleRequest);

server.listen(4000, () => {
  console.log("Server is listening on port 7080");
});
```

Q. Create server which can handle both json/form data without specifying which format of data is being received.

- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form
- send entire data in response
- data sent from postman should have fields:
  - city
  - state
  - country
  - pin

```js
// data sent from postman
// {
//   "city": "siwan",
//   "state": "bihar",
//   "country": "india",
//   "pin":"841501"
// }
var http = require("http");
var qs = require("querystring");

function handleRequest(req, res) {
  const dataFormat = req.headers["content-type"];
  console.log(dataFormat);
  let store = "";
  req
    .on("data", (chunk) => {
      store += chunk;
    })
    .on("end", () => {
      if (req.method === "POST" && req.url === "/") {
        let parsedData;

        if (dataFormat === "application/json") {
          parsedData = JSON.parse(store);
          res.writeHead(201, { "Content-Type": "application/json" });
        } else if (dataFormat === "application/x-www-form-urlencoded") {
          parsedData = qs.parse(store);
          res.writeHead(201, { "Content-Type": "text/plain" });
        }
        res.write(JSON.stringify(parsedData));
      }
      res.end();
    });
}

var server = http.createServer(handleRequest);

server.listen(9000, () => {
  console.log("Server listening on port 9000");
});
```

Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

- format of json data is {name: your name, email: "", }
- Html response format is `<h1>Name</h1><h2>email</h2>`

```js
var http = require("http");
var qs = require("querystring");
const { json } = require("stream/consumers");

function handleRequest(req, res) {
  const dataFormat = req.headers["content-type"];
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    let parsedData;
    if (req.method === "POST" && req.url === "/") {
      if (dataFormat === "application/json") {
        parsedData = JSON.parse(store);
        res.writeHead(201, { "Content-Type": "text/html" });
        console.log(parsedData);
        res.write(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`);
      } else if (dataFormat === "application/x-www-form-urlencoded") {
        parsedData = qs.parse(store);
        res.writeHead(201, { "Content-Type": "text/html" });
        console.log(parsedData);
        res.write(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`);
      }
    }
    res.end();
  });
}

var server = http.createServer(handleRequest);

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
```

Q. Follow above question with form data containing fields i.e name and email.

- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.

#### Note:-

Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.

```js
var http = require("http");
var qs = require("querystring");

function handleRequest(req, res) {
  const dataFormat = req.headers["content-type"];
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    let parsedData;
    if (
      req.method === "POST" &&
      req.url === "/" &&
      dataFormat === "application/x-www-form-urlencoded"
    ) {
      console.log(store);
      parsedData = qs.parse(store);
      res.writeHead(201, { "Content-Type": "text/html" });
      console.log(parsedData);
      res.write(`<h2>${parsedData.email}</h2>`);
    }
    res.end();
  });
}

var server = http.createServer(handleRequest);

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
```
