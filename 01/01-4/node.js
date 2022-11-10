const string = "abd";
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};

console.time("전체 시간");
console.log("평범한 로그입니다.");
console.log(string, number, boolean);
console.error("에러 메세지 입니다.");

console.dir(obj, { color: false, depth: 2 });
console.dir(obj, { color: true, depth: 1 });

console.time("시간 측정");
for (let i = 0; i < 100000; i++) {
  continue;
}
console.timeEnd("시간 측정");

function b() {
  console.trace("에러 위치 추적");
}
function a() {
  b();
}

console.timeEnd("전체 시간");
