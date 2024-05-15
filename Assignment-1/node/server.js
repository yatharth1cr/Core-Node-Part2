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
