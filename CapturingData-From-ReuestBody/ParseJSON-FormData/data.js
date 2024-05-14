const http = require("http");
const qs = require("querystring");
const port = 7000;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  // Extract the content type from the request headers
  const contentType = req.headers["content-type"];
  console.log("Content-Type:", contentType);

  let store = "";

  // Listen for data chunks
  req.on("data", (chunk) => {
    store += chunk;
  });

  // Once all data received
  req.on("end", () => {
    // Log received data
    console.log("Received data:", store);

    // Determine the request method and URL
    if (
      req.method === "POST" &&
      req.url === "/json" &&
      contentType === "application/json"
    ) {
      // Respond if it's JSON data
      console.log("Received JSON data: ", store);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(store);
    } else if (
      req.method === "POST" &&
      req.url === "/form" &&
      contentType === "application/x-www-form-urlencoded"
    ) {
      // Respond if it's form data
      console.log("Received form data: ", store);
      var formData = qs.parse(store);
      res.writeHead(200, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
      res.write(JSON.stringify(formData));
    } else {
      // Respond with an error if the request is not supported
      console.log("Unsupported request or content type");
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.write("Unsupported request or content type");
    }
    // res.write(store);
    res.end();
  });
}

// Respond with an error if the request is not supported
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
