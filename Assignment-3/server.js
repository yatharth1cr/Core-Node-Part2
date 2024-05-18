const http = require("http");

function handleRequest(req, res) {}

const server = http.createServer(handleRequest);

var PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
