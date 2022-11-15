# File System

## fs

노드에서는 파일에 대한 입출력을 담당하는 모듈을 fs로 사용 합니다.
저희가 이전 코드에서 res.write를 했던 부분에 html에 대한 데이터를 가지고와서 응답으로 보내게 되면 해당 웹 페이지를 보내 준것과 같은 효과를 볼 수 있습니다.

```javascript
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
```

File System과 관련된 다른 메소드들은 [링크](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html)를 참고 해 주세요

## 여러 주소로 받기

우리는 지금까지 "http://localhost:8080"으로만 요청하고 응답을 하였습니다. 하지만 우리가 "http://localhost:8080/02-2"로 하였을 때 내가 원하는 페이지를 보여 줄 수 있는 방법은 아래와 같습니다.

```javascript
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
```

이렇게 코드를 하였을 때 우리가 "http://localhost:8080/02-2"로 요청을 하면 동일한 웹을 받을 수 있습니다.

하지만 이러한 방식의 코딩에서 문제점은 내가 일일히 모든 경로에 대해서 코드를 작업 해 주어야 한다는 단점이 있습니다.

이것을 해결하기 위해서는 express라는 모듈을 사용 해 보려고 합니다.
