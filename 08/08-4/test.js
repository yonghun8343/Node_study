const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});

promise
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log(err);
  });

function sum(a, b) {
  return new Promise((resolve, reject) => {
    resolve(a + b);
  });
}

function minus(a, b) {
  return new Promise((resolve, reject) => {
    resolve(a - b);
  });
}

sum(1, 2)
  .then((val) => minus(val, 1))
  .then((val) => {
    return minus(val, 1);
  })
  .then((val2) => {
    console.log(val2);
  });
