const http = require("http");
const url = require("url");
const fs = require("fs");
const server = http.createServer().listen(8080);

server.on("request", (req, res) => {
  const pathname = url.parse(req.url).pathname;

  req.on("end", () => {
    if (pathname === "/02-2") {
      fs.readFile("./example.html", (err, data) => {
        if (err) {
          console.log(err);
          res.end("에러가 발생하였습니다.");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    }
  });
});
