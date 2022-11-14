// 일반적인 프로미스 선언
const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});

// 프로미스 기본 사용 법
promise
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log(err);
  });

// 함수에 프로미스 적용
function sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

function minus(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a - b);
    }, 1000);
  });
}

// 프로미스 체이닝
sum(1, 2)
  .then((val) => minus(val, 1))
  .then((val) => {
    return minus(val, 1);
  })
  .then((val2) => {
    console.log(val2);
  });
