// require path module
var path = require("path");

// Log the directory name
console.log(__dirname);

// Log the filename
console.log(__filename);

// Use path module to join __dirname and server.js
var joinPath = path.join(__dirname, "./server.js");

// Log the joined path
console.log(joinPath);
