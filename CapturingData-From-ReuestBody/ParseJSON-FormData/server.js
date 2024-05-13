var http = require("http");

var port = 7000;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {}

server.listen(port, () => {
  `Server listening on port ${port}`;
});
