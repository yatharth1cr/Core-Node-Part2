var http = require("http");
var fs = require("fs");

var server = http.createServer((req, res) => {
  if (req.method === "GET") {
    res.writeHead(201, { "Content-Type": "text/plain" });
    fs.createReadStream("./readme.txt").pipe(res);
  } else {
    res.end("page not found");
  }
});

server.listen(4000, () => {
  console.log("server is listening on port 4000");
});
