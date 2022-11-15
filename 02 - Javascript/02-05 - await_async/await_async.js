// setTimeout은 Promise가 아니므로 직접 선언해서 만들어 줌.
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

// await을 통해 1초 기다리는 것을 동기로 수행
async function sum(a, b) {
  await wait(1000);
  return a + b;
}

function minus(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a - b);
    }, 1000);
  });
}

sum(1, 2).then((val) => {
  console.log(`async를 바로 실행하면? ${val}`);
});

async function run() {
  const result = await sum(1, 2);
  console.log(`함수 안에 넣어서 실행시키면? ${result}`);
}
run();

sum(1, 2)
  .then((val) => minus(val, 1))
  .then((val) => {
    return minus(val, 1);
  })
  .then((val2) => {
    console.log(val2);
  });
