const http = require("http");
const fs = require("fs");
const url = require("url");

let userPath = __dirname + "/users/";

function handleRequest(req, res) {
  let store = "";
  let parsedUrl = url.parse(req.url, true);

  // on data the req
  req.on("data", (chunk) => {
    store += chunk;
  });

  // on end the req
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      let userName = JSON.parse(store).username;
      fs.open(userPath + userName + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            res.end(`${userName} created successfully`);
          });
        });
      });
    } else if (req.method === "GET" && parsedUrl.pathname === "/users") {
      console.log("parsedUrldata: ", parsedUrl);
      var userName = parsedUrl.query.username;
      fs.readFile(userPath + userName + ".json", (err, content) => {
        if (err) console.log(err);
        res.end(content);
      });
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
