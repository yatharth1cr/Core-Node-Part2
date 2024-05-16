var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var path = require("path");

function handleRequest(req, res) {
  //   const dataFormat = req.headers["Content-Type"];
  //   console.log(dataFormat);

  if (req.method === "GET" && req.url === "/form") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream("./form.html").pipe(res);
  } else if (req.method === "POST" && req.url === "/form") {
    let formData = "";

    // req.setEncoding("utf-8");

    req.on("data", (chunk) => {
      formData += chunk;
    });

    req.on("end", () => {
      var parsedData = qs.parse(formData);
      res.writeHead(200, { "Content-Type": "text/html" });
      //   console.log("formData: ", formData);
      //   console.log("parsedData: ", parsedData);

      res.write("<h1>Form Data Received</h1>");
      res.write(
        `<p>Name: ${parsedData.name}</p><p>Email:${parsedData.email}</p><p>Age:${parsedData.age}</p>`
      );

      // End the response after writing the content
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
}

var server = http.createServer(handleRequest);

server.listen(5678, () => {
  console.log("Server listening on port 5678");
});
