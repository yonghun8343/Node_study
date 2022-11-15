// const winston = require("winston");

// const logger = winston.createLogger({
//   level: "info", //0,1,2 까지 로그로 남기겠다
//   format: winston.format.json(), // json형태로 로그를 남기겠다.
//   transports: [
//     new winston.transports.Console(), // 콘솔에도 로그 출력
//     new winston.transports.File({ filename: "./log/combined.log" }), // 파일로 로그 내용 남김
//     new winston.transports.File({
//       filename: "./log/error.log",
//       level: "error",
//     }),
//   ],
// });

// module.exports = logger;

// const { createLogger, format, transports } = require("winston");
// const { combine, timestamp, label, printf } = format;

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

// const logger = createLogger({
//   format: combine(label({ label: "라벨 예제 입니다." }), timestamp(), myFormat),
//   transports: [new transports.Console()],
// });

// logger.info("레벨은 info입니다.");

// module.exports = logger;

const { createLogger, format, transports } = require("winston");
const { DailyRotateFile } = require("winston-daily-rotate-file");
const path = require("path");

const logger = createLogger({
  level: "info",
  format: format.json({ deterministic: false }),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      datePattern: "YYYY-MM-DD",
      maxSize: "1m",
      dirname: path.join(__dirname, "log"),
      filename: "combinedLog-%DATE%.log",
    }),
    new transports.DailyRotateFile({
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxSize: "100m",
      dirname: path.join(__dirname, "log"),
      filename: "error-%DATE%.log",
    }),
  ],
});

function getTime() {
  const dt = new Date();
  const year = dt.getFullYear();
  const month = `0${dt.getMonth() + 1}`.slice(-2);
  const day = `0${dt.getDate()}`.slice(-2);
  const hh = `0${dt.getHours()}`.slice(-2);
  const mm = `0${dt.getMinutes()}`.slice(-2);
  const ss = `0${dt.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
}

function infoLog(func, sender, receiver, data) {
  logger.log({
    level: "info",
    time: `${getTime()}`,
    function: `${func}`,
    sender: `${sender}`,
    receiver: `${receiver}`,
    data: `${data}`,
  });
}

for (let i = 0; i < 10000; i++) {
  infoLog(
    "indexRouter",
    "hun1",
    "hun2",
    "채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅채팅"
  );
}

module.exports = logger;

// {"level":"info","time":"2022-11-13 18:14:41","function":"sendMessage","eventName":"send","sender":"hun1","receiver":"hun2","data":"추후 채팅방 만들 때 이렇게 해 주세요"}
