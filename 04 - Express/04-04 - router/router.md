# Router

우리가 express-generator를 이용하여 설치를 하였을 경우 routes라는 폴더가 자동으로 생성됩니다.

여기서 index.js파일을 보면 아래의 코드처럼 선언 되어 있습니다.

```javascreipt
var express = require("express");
var router = express.Router();

router.get(...);

router.post(...);

module.exports = router;
```

제일 처음 express 모듈을 불러오고 2번째 줄에서 express의 기본 제공 모듈인 Router를 불러옵니다.

그렇다면 express에서 기본적으로 들어갈 router에 대해서 알아봅시다.

## Router 란

라우터에 대한 정의는 다음과 같습니다.

라우터(router[a] 혹은 라우팅 기능을 갖는 공유기)는 컴퓨터 네트워크 간에 데이터 패킷을 전송하는 네트워크 장치다. 패킷의 위치를 추출하여, 그 위치에 대한 최적의 경로를 지정하며, 이 경로를 따라 데이터 패킷을 다음 장치로 전달한다. 이때 최적의 경로는 일반적으로는 가장 빠르게 통신이 가능한 경로이므로, 일반적으로는 최단 거리일 수 있지만, 돌아가는 경우라도 고속의 전송로를 통하여 전달이 될 수도 있다. 간단히 말해, 서로 다른 네트워크 간에 중계 역할을 해주는 장치다.

내용을 굳이 외울 필요는 없습니다. 다만 express의 라우터는 정의 부분에서 express의 라우터는 "경로를 지정하며, 이 경로를 따라 데이터 패킷을 다음 장치로 전달한다." 라고 생각 해 주시면 될것 같습니다.

![router](./Frame%2011.png)

## Router 기본 사용법

위의 이미지에서 예를 든 board라는 경로를 라우터로 만들면서 설명을 드리겠습니다.

우선 routes폴더 내에 board.js를 만들어 줍니다.

그 뒤 처음 내용은 index나 user와 같이 내용을 넣어 줍니다.

```javascript
var express = require("express");
var router = express.Router();

router.get("/getBoard", (req, res, next) => {
  // board에 대한 정보를 불러오는 코드
});

module.exports = router;
```

그 뒤 app.js에 우리가 라우터를 /board로 불러온다는 것을 코딩해 주어야 합니다.

```javascript
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var boardRouter = require("./routes/board");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/board", boardRouter);
```

require를 통해 우리가 만들었던 board.js파일을 불러 오고 난 후 app.use를 통해 미들웨어로 router에 대한 정보를 넣어 우리가 board.js에서 작성했던 메소드에 대해서 express가 접근 할 수 있도록 해 줍니다.

위 처럼 작업이 끝났다면 router에 대한 사용이 가능합니다.
