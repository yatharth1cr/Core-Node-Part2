const http = require("http");
const fs = require("fs");

function handleRequest(req, res) {
  let store = "";
  console.log(__dirname + "/users/");
  // on data the req
  req.on("data", (chunk) => {
    store += chunk;
  });

  // on end the req
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      let userName = JSON.parse(store).username;
      fs.open(__dirname + userName + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        console.log(fd);
      });
      console.log("username: ", userName);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("page not found");
    }
  });
}

const server = http.createServer(handleRequest);

var PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
