const cluster = require("cluster");
const process = require("process");

cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 ${process.pid}가 시작되었습니다.`);

  cluster.fork();
  cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `워커 프로세스 ${worker.process.pid}에서 에러가 발생 했습니다.`
    );
  });
} else {
  const http = require("http");

  http
    .createServer((req, res) => {
      res.end(`<p>Hello Server</p>`);
    })
    .listen(8000, () => {
      console.log(`8000번 포트가 서버 대기 중입니다.`);
    });

  console.log(`워커 프로세스 ${process.pid}가 시작되었습니다.`);

  setTimeout(() => {
    process.exit();
  }, 1000);
}
