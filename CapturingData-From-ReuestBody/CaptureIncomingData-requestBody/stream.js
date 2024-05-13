var http = require("http");

var port = 3456;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk; // concatenating the received data
  });

  req.on("end", () => {
    if (req.method === "POST" && req.url === "/") {
      console.log("Data received: ", store); // logging received data
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Recieved data: " + store);
      res.end();
    }
  });
}

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
