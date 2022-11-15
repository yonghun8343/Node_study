const { fork } = require("child_process");

const child1 = fork("./fork_cluster/server.js", ["child"]);
child1.on("error", (err) => {
  console.log(`child1에서 에러가 발생 했습니다. ${err}`);
});

const child2 = fork("./fork_cluster/server.js", ["child"]);
child2.on("error", (err) => {
  console.log(`child2에서 에러가 발생 했습니다. ${err}`);
});
