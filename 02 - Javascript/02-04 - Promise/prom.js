// function callback(callback) {
//   if (condition) {
//     callback("성공");
//   } else {
//     callback("실패");
//   }
// }
// callback((msg) => {
//   console.log(msg);
// });

const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject("실패");
  }
});

// promise
//   .then((msg1) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(`msg1은 ${msg1}입니다.`);
//         resolve(msg1);
//       }, 1000);
//     });
//   })
//   .then((msg2) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(`msg2는 ${msg2}입니다.`);

//         resolve(msg2);
//       }, 1000);
//     });
//   })
//   .then((msg3) => {
//     console.log(`msg3은 ${msg3}입니다.`);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// promise
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

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
    console.log(val);
    minus(val, 1);
  })
  .then((val2) => {
    console.log(val2);
  });

setTimeout(() => {}, 1000);
setTimeout(() => {}, 1000);
console.log("err");
