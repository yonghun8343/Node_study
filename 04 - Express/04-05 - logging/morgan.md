# morgan

01-8 logging의 내용에서 추가됩니다.

package.json에서 morgan이 설치가 되는 것을 보았을 것입니다.

그리고 우리가 express로 요청을 보내고 응답을 받았을 때 콘솔에 아래와 같이 나오는 것을 보았습니다.

```text
POST /login 200 14.266 ms - -
```

app.js 파일을 보면 아래와 같이 되어있습니다.

```javascript
var logger = require("morgan");

app.use(logger("dev"));
```

morgan 모듈을 logger 변수에 담고 app.use를 이용해 logger의 dev라는 변수로 불러 오고 있습니다.app.use(logger('dev'));

dev 대신 넣을 수 있는 옵션에 대해서는 해당 [링크](https://github.com/expressjs/morgan#predefined-formats)를 참고 해 주세요.

각각의 옵션을 넣을 때 어떻게 나오는지는 Github에 예시가 있습니다. 이를 참고 해 주세요.

실습으로 prod일 때에 아래의 로그 형식을 적용하고, dev일 때는 `app.use(morgan('dev));`를 적용 해 주세욧.

```text
prod일 때
[:remote-addr - :remote-user] [:date[web]] :method :url HTTP/:http-version :status :response-time ms
```

morgan는 서버를 구동 시키는 콘솔에 로그를 남기는 위주로 사용하고 모듈에 파일로 로그를 남기는 기능이 추가되어 있지만 모듈에서 제공하는 포맷팅 이외에 다른 내용을 넣기가 힘들다는 단점이 있습니다. 그래서 파일이나 데이터베이스에 로그를 남기는 작업은 winston을 더 많이 사용 합니다.
