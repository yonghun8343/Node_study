const fs = require("fs");
const http = require("http");

http.createServer((req, res) => {
  fs.readFile("./example.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end("에러가 발생하였습니다.");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});
