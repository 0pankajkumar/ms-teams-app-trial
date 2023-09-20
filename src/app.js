const restify = require("restify");
const send = require("send");
const fs = require("fs");

//Create HTTP server.
const server = restify.createServer({
  key: process.env.SSL_KEY_FILE ? fs.readFileSync(process.env.SSL_KEY_FILE) : undefined,
  certificate: process.env.SSL_CRT_FILE ? fs.readFileSync(process.env.SSL_CRT_FILE) : undefined,
  formatters: {
    "text/html": function (req, res, body) {
      return body;
    },
  },
});

server.get(
  "/static/*",
  restify.plugins.serveStatic({
    directory: __dirname,
  })
);

server.listen(process.env.port || process.env.PORT || 3333, function () {
  console.log(`\n${server.name} listening to ${server.url}`);
});

// Adding tabs to our app. This will setup routes to various views
// Setup home page
const locallyHosted = "file:///Users/pankaj/Documents/dumpyard/throwaway-react-app/build/index.html";
const googlePage = "https://www.google.com";
const original = __dirname + "/views/hello.html";
const modifiedOriginal = __dirname + "/views/index.html";
const localHostOption = "http://localhost:3000/";
const singleAllInOneFile = __dirname + "/views/all-in-one.html";

server.get("/", (req, res, next) => {
  send(req, singleAllInOneFile).pipe(res);
});

// Setup the static tab
server.get("/tab", (req, res, next) => {
  send(req, singleAllInOneFile).pipe(res);
});
