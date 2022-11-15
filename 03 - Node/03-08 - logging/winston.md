# logging

로그를 남기는 것은 매우 중요하지만 생각보다 귀찮은 작업입니다. 어느 부분에서 로그를 남겨야 하는지도 햇갈리고, 어떻게 하는지도 잘 모르겠는 경우가 많습니다.

로그의 기본 다음과 같습니다.

1. 파일로 남길 수 있어야 한다.
2. 개발자가 보기 좋은 형태로 저장 되어야 한다.
3. 백업하기에 용이 해야한다.

그래서 npm에서 로그를 남기기 쉽게 여러 패키지들이 나왔는데 그 중 express의 미들웨어로 사용 가능한 morgan과 Node에서 일반적으로 사용 되는 winston에 대해서 두가지 다 사용 해 보려 합니다.

## winston

winston은 express를 설치하면 기본으로 들어가지는 않습니다. 우리가 별도로 설치하여 적용 하는 것을 해 보려 합니다.

### 설치 법

설치 방법은 다음과 같습니다.

```javascript
npm i winston
```

### 사용 법

winston이라는 모듈이 로그를 남겨 준다는 것은 알지만 morgan처럼 자동으로 로그를 남겨 주는 것인지, 혹은 무엇인가 더 추가적인 작업이 필요한지는 아직 모르는 상태입니다.

morgan의 경우에는 간단하게 mormat을 정하고 해당 포맷으로 지정해서 사용 할 수 있지만, 로그를 남기는 폭이 좁습니다 예를들어 winston에서 제공하는 로그 레벨은 아래처럼 7가지 입니다.

```javascript
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
```

물론 실제 프로젝트에서 모두 사용하지는 않지만, 그래도 morgan보다는 로그를 상세하게 나눌 수 있습니다.

그렇다면 이제 winston을 제대로 사용 하는 방법에 대해서 알아봅시다.

winston은 Log를 어떠한 형태로 생성할지에 대해서 먼저 선언을 해 준 다음 해당 객체를 불러와 함수를 저장 합니다.

그렇다면 로그에 대해서 선언을 해 봅시다.

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // 콘솔에도 로그 출력
    new winston.transports.File({ filename: "combined.log" }), // 파일로 로그 내용 남김
  ],
});
```

위의 예시는 아주 기본적인 예시입니다.

레벨은 info 레벨로 설정을 해 두었고, 위의 7개의 레벨 중 info로 설정 하였을 때에 info 이하의 레벨만 로그로 기록이 됩니다.

```javascript
logger.log({
  level: "info",
  message: "로그 함수로 레벨를 지정 해 주며 레벨 및 메세지를 로그로 남김",
});

logger.info("레벨은 info로 지정하고, 메세지만 남김");

logger.error("레벨은 error로 지정하고, 메세지만 남김");

logger.debug("레벨이 info이기 때문에 해당 로그는 남지 않습니다.");
```

파일 위치는 현재의 폴더로 지정이 되어 있는데, transport의 File에서 파일이 저장되는 위치도 바꾸어 줄 수 있습니다. 폴더가 없어도 자동으로 생성 해 줍니다.

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // 콘솔에도 로그 출력
    new winston.transports.File({ filename: "./log/combined.log" }), // 파일로 로그 내용 남김
  ],
});
```

만약 에러 로그를 따로 남기고 싶을 수 있습니다. 하지만 경험상 error 로그와 info로그를 따로 남기게 되면 전체적인 흐름이 보이지 않아 오히려 가독성이 떨어집니다.

그러므로 에러만 따로 파일에 저장을 하되, info와 error가 같이 있는 파일도 같이 생성해 주는 것이 좋습니다.

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // 콘솔에도 로그 출력
    new winston.transports.File({ filename: "./log/combined.log" }), // 파일로 로그 내용 남김
    new winston.transports.File({
      filename: "./log/error.log",
      level: "error",
    }), // 에러만 별도의 파일로 남김
  ],
});
```

지금 까지 로그를 남기는데에 큰 문제가 있습니다. 바로 시간을 별도로 지정 해 주지 않았기 때문에 이를 해결하기 위해서 별도의 포맷을 지정 해 줍니다.

포맷을 지정 해 주는 방법은 아래와 같습니다.

```javascript
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "라벨 예제입니다." }), timestamp(), myFormat),
  transports: [new transports.Console()],
});

logger.log({
  level: "info",
  message: "로그 함수로 레벨를 지정 해 주며 레벨 및 메세지를 로그로 남김",
});

logger.info("레벨은 info로 지정하고, 메세지만 남김");

logger.error("레벨은 error로 지정하고, 메세지만 남김");

logger.debug("레벨이 info이기 때문에 해당 로그는 남지 않습니다.");
```

이번 예시는 비구조화 할당으로 모듈에서 필요한 부분만 코드로 불러와서 예제를 만들어보았습니다.

실행 해 보면 아래와 같은 결과값이 나오는데, 가독성이 그렇게 좋지 않고 json으로 만들 수 없습니다.

```bash
2022-11-13T08:44:37.411Z [라벨 예제입니다.] info: 로그 함수로 레벨를 지정 해 주며 레벨 및 메세지를 로그로 남김
2022-11-13T08:44:37.412Z [라벨 예제입니다.] info: 레벨은 info로 지정하고, 메세지만 남김
2022-11-13T08:44:37.412Z [라벨 예제입니다.] error: 레벨은 error로 지정하고, 메세지만 남김
```

그렇다면 어떻게 해야할까요? winston의 장점인 가장 기초적인 방법으로도 로그를 남길 수 있다는 것입니다.

아래의 코드를 봅시다.

```javascript
const { createLogger, format, transports } = require("winston");
const path = require("path");

const logger = createLogger({
  level: "info",
  format: format.json({ deterministic: false }),
  transports: [
    new transports.Console(), // 콘솔에도 로그 출력
    new transports.File({ filename: "./log/combined.log" }), // 파일로 로그 내용 남김
    new transports.File({
      dirname: path.join(__dirname, "log"),
      filename: "error.log",
      level: "error",
    }), // 에러만 별도의 파일로 남김
  ],
});

// 현재의 시간을 가지고 오는 함수.
function getTime() {
  const dt = new Date();
  const year = dt.getFullYear();
  const month = `0${dt.getMonth() + 1}`.slice(-2);
  const date = `0${dt.getDate()}`.slice(-2);
  const hh = `0${dt.getHours()}`.slice(-2);
  const mm = `0${dt.getMinutes()}`.slice(-2);
  const ss = `0${dt.getSeconds()}`.slice(-2);
  const gt = `${year}-${month}-${date} ${hh}:${mm}:${ss}`;
  return gt;
}

// 로그에 대한 포맷을 생성
function infoLog(func, eventName, sender, receiver, data) {
  infoLogs.log({
    level: "info",
    time: `${getTime()}`,
    function: `${func}`,
    eventName: `${eventName}`,
    sender: `${sender}`,
    receiver: `${receiver}`,
    data: `${data}`,
  });
}

infoLog(
  "sendMessage",
  "send",
  "hun1",
  "hun2",
  "추후 채팅방 만들 때 이렇게 해 주세요~"
);
```

format에 deterministic옵션을 넣지 않으면 json안의 key값이 오름차순으로 정렬이 됩니다.

```text
deterministic가 true일 경우
{"data":"추후 채팅방 만들 때 이렇게 해 주세요","eventName":"send","function":"sendMessage","level":"info","receiver":"hun2","sender":"hun1","stable":true,"time":"2022-11-13 18:12:13"}

deterministic가 false일 경우
{"level":"info","time":"2022-11-13 18:14:41","function":"sendMessage","eventName":"send","sender":"hun1","receiver":"hun2","data":"추
후 채팅방 만들 때 이렇게 해 주세요"}
```

이제 우리가 로그의 조건 중 1번 "파일로 남길 수 있어야 한다."과 2번 "개발자가 보기 좋은 형태로 저장 되어야 한다."의 조건이 충족 되었습니다.

하지만 계속 하나의 파일에서 저장이 될 경우 백업을 진행하기 어려우며 로그의 길이가 길어져 사람의 육안으로 찾기가 힘들어지는 단점이 있습니다. 이를 해결하기 위해서 winston 모듈을 보안 해 주는 winston-daily-rotate-file 모듈이 있습니다.

```bash
npm i winston-daily-rotate-file
```

사용법은 기존의 createLogger 안의 transports 안에서 선언 해 주면 됩니다.

```javascript
const { createLogger, format, transports } = require("winston");
const { DailyRotateFile } = require("winston-daily-rotate-file");
const path = require("path");

const logger = createLogger({
  level: "info",
  format: format.json({ deterministic: false }),
  transports: [
    new transports.Console(), // 콘솔에도 로그 출력
    new transports.DailyRotateFile({
      datePattern: "YYYY-MM-DD",
      maxSize: "100m",
      dirname: path.join(__dirname, "log"),
      filename: "./log/combinedLog-%DATE%.log",
    }), // 파일로 로그 내용 남김
    new transports.DailyRotateFile({
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxSize: "100m",
      dirname: path.join(__dirname, "log"),
      filename: "errorLog-%DATE%.log",
    }), // 에러만 별도의 파일로 남김
  ],
});
```

이제 매일 자정에 로그 파일이 변경이 되고, 100메가 바이트가 넘을 때 마다 파일이 새로 생성이 됩니다. 정말 파일이 바뀌는지 테스트를 해 보기위해서 옵션을 maxSize를 '1m'로 바꾸고 파일 제일 밑에 for문을 통해 로그를 남겨주세요

```javascript
for (let i = 0; i < 10000; i++) {
  infoLog(
    "sendMessage",
    "send",
    "hun1",
    "hun2",
    "추후 채팅방 만들 때 이렇게 해 주세요"
  );
}
```

이제 파일이 combinedLog-2022-11-13.log.1만들어지고 해당 파일에 로그가 남는 것을 볼 수 있습니다.

이외에 여러가지 옵션이 있지만 추후 관심이 있을 때 하나씩 적용 해 보는 것이 좋습니다.
